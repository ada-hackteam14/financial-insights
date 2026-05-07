import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import SummaryCard from "./components/SummaryCard";
import InsightCard from "./components/InsightCard";
import CategoryCard from "./components/CategoryCard";
import TransactionList from "./components/TransactionList";

import {
  getUser,
  getTransactions,
  getTotalSpent,
  getBalance,
  getSpentPercentage,
  getInsights,
  getSpendingByCategory,
} from "./utils/calculations";

// getTotalSpent().then((v) => console.log("Total gasto:", v));
// getBalance().then((v) => console.log("Saldo:", v));
// getSpendingByCategory().then((v) => console.log("Por categoria:", v));
// getInsights().then((v) => console.log("Insights:", v));

function App() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [balance, setBalance] = useState(0);
  const [spentPercentage, setSpentPercentage] = useState(0);
  const [categories, setCategories] = useState({});
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    async function loadData() {
      const userData = await getUser();
      const transactionsData = await getTransactions();
      const totalSpentData = await getTotalSpent();
      const balanceData = await getBalance();
      const percentageData = await getSpentPercentage();
      const categoriesData = await getSpendingByCategory();
      const insightsData = await getInsights();

      setUser(userData);
      setTransactions(transactionsData);
      setTotalSpent(totalSpentData);
      setBalance(balanceData);
      setSpentPercentage(percentageData);
      setCategories(categoriesData);
      setInsights(insightsData);
    }

    loadData();
  }, []);

  if (!user) {
    return <div className="p-10 text-gray-700">Carregando...</div>;
  }

  return (
    <BrowserRouter>
      <div>
        <h1 className="text-2xl">Financial Insights</h1>
      </div>
      <div className="2xl:m-12 lg:m-10 md-6 sm-2">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Renda"
            value={`R$ ${user.monthlyIncome.toFixed(2)}`}
            subtitle="/por mês"
          />
          <SummaryCard
            title="Total gasto"
            value={`R$ ${totalSpent.toFixed(2)}`}
            subtitle={`${spentPercentage}% da renda`}
          />
          <SummaryCard
            title="Saldo restante"
            value={`R$ ${balance.toFixed(2)}`}
            subtitle="saldo"
          />
          <SummaryCard
            title="Transações"
            value={transactions.length}
            subtitle="registradas"
          />
        </div>

        {/* Insights */}
        <div className="mb-6">
          <h2
            className="
            text-lg
            font-bold
            text-gray-800
            uppercase
            mb-4
          "
          >
            Alertas e recomendações
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((item, index) => (
              <InsightCard
                key={index}
                type={item.type}
                title="{item.title}"
                message={item.message}
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h2
            className="
            text-lg
            font-bold
            text-gray-800
            uppercase
            mb-4
          "
          >
            Visão por Categoria
          </h2>

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
          >
            {Object.entries(categories).map(([category, value]) => (
              <CategoryCard
                key={category}
                category={category}
                value={value.toFixed(2)}
                percentage={((value / user.monthlyIncome) * 100).toFixed(0)}
                color="bg-purple-700"
              />
            ))}
          </div>
        </div>

        {/* Transactions */}
        <TransactionList transactions={transactions.slice(0, 6)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
