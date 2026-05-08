import { useEffect, useState } from "react";

import NavBar from "../components/navbar";
import SummaryCard from "../components/SummaryCard";
import InsightCard from "../components/InsightCard";
import CategoryCard from "../components/CategoryCard";
import TransactionList from "../components/TransactionList";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";

import { getUser, getTransactions } from "../utils/calculations";
import {
  buildFinancialDashboard,
  moneyFormatter,
} from "../utils/analytics";



export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getUser();
        const transactionsData = await getTransactions();

        setUser(userData);
        setTransactions(transactionsData);
        setDashboard(buildFinancialDashboard(userData, transactionsData));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadData();
  }, []);

  if (status === "loading") {
    return <div className="p-10 text-gray-700">Carregando análise...</div>;
  }

  if (status === "error") {
    return (
      <div className="p-10 text-red-700">
        Não foi possível carregar os dados. Rode npm run api em outro terminal.
      </div>
    );
  }

  return (
    <div className="flex">
      <NavBar />
      
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
              {dashboard.dominantCategory.category}. Os gráficos abaixo
              transformam suas transações em decisões rápidas de economia.
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
                dashboard.realBalance < 0
                  ? "renda mensal já comprometida"
                  : "saldo"
              }
            />

            <SummaryCard
              title="Economia possível"
              value={moneyFormatter(dashboard.possibleSavings)}
              subtitle={`reduzindo 10% em ${dashboard.dominantCategory.category}`}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 uppercase mb-4">
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

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase mb-4">
              Alertas e recomendações
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dashboard.insights.map((item, index) => (
                <InsightCard
                  key={index}
                  type={item.type}
                  message={item.message}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase mb-4">
              Visão por Categoria
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboard.categories.map(item => (
                <CategoryCard
                  key={item.category}
                  category={item.category}
                  value={item.total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  percentage={item.percentage.toFixed(0)}
                  color="bg-purple-700"
                />
              ))}
            </div>
          </div>

          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
