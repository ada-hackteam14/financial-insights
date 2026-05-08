import React, { useEffect, useState } from "react";

// Components
import SummaryCard from "../components/SummaryCard";
import InsightCard from "../components/InsightCard";
import CategoryCard from "../components/CategoryCard";
import TransactionList from "../components/TransactionList";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";

import {
  getUser,
  getTransactions,
  buildFinancialDashboard,
  moneyFormatter,
  User,
  Transaction,
  FinancialDashboard,
} from "../utils/analytics";

type Status = "loading" | "success" | "error";

export default function Dashboard(): React.JSX.Element {
  const [dashboard, setDashboard] = useState<FinancialDashboard | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getUser();
        const transactionsData = await getTransactions();

        if (userData && transactionsData) {
          setUser(userData);
          setTransactions(transactionsData);
          setDashboard(buildFinancialDashboard(userData, transactionsData));
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setStatus("error");
      }
    }

    loadData();
  }, []);

  if (status === "loading") {
    return (
      <div className="p-10 text-gray-700">
        Carregando análise inteligente...
      </div>
    );
  }

  if (status === "error" || !user || !dashboard) {
    return (
      <div className="p-10 text-red-700">
        Não foi possível carregar os dados. Verifique se o servidor API está
        rodando.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 px-4 py-6 sm:px-6 lg:px-10 2xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-700">
            Consumer Insight Intelligence
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Olá, {user.name}
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Seu consumo este mês está concentrado em{" "}
            <span className="font-semibold text-purple-700">
              {dashboard.dominantCategory.category}
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Renda"
            value={moneyFormatter(user.monthlyIncome)}
            subtitle="/por mês"
          />
          <SummaryCard
            title="Total gasto"
            value={moneyFormatter(dashboard.totalSpent)}
            subtitle={`${dashboard.spentPercentage.toFixed(1)}% da renda`}
          />
          <SummaryCard
            title="Saldo restante"
            value={moneyFormatter(dashboard.balance)}
            subtitle={
              dashboard.realBalance < 0 ? "renda comprometida" : "disponível"
            }
          />
          <SummaryCard
            title="Economia possível"
            value={moneyFormatter(dashboard.possibleSavings)}
            subtitle={`reduzindo 10% em ${dashboard.dominantCategory.category}`}
          />
        </div>

        {/* Gráficos */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-4 text-sm tracking-wider">
            Visualizações de consumo
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <PieChart
              data={dashboard.categories}
              dominant={dashboard.dominantCategory}
              total={dashboard.totalSpent}
            />
            <BarChart data={dashboard.categories} />
            <div className="xl:col-span-2">
              <LineChart data={dashboard.trend} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 uppercase mb-4 text-sm tracking-wider">
            Alertas e recomendações
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dashboard.insights.map((item, index) => (
              <InsightCard
                key={index}
                type={item.type === "tip" ? "info" : item.type}
                message={item.message}
              />
            ))}
          </div>
        </div>
        {/* Visão por Categoria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboard.categories.map((item) => (
            <CategoryCard
              key={item.category}
              category={item.category}
              value={item.total}
              percentage={item.percentage}
              color="bg-purple-700"
            />
          ))}
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
