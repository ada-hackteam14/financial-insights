import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

const API_URL = "http://127.0.0.1:3001";

const normalizeCategory = category => {
  const categories = {
    "AlimentaÃ§Ã£o": "Alimentação",
    Alimentacao: "Alimentação",
    "Alimentação": "Alimentação",
    "SaÃºde": "Saúde",
    Saude: "Saúde",
    "Saúde": "Saúde",
    "VestuÃ¡rio": "Vestuário",
    Vestuario: "Vestuário",
    "Vestuário": "Vestuário",
    Moradia: "Moradia",
    Transporte: "Transporte",
    Lazer: "Lazer"
  };

  return categories[category] || category || "Outros";
};

const getCategoryData = transactions => {
  const totals = transactions.reduce((acc, transaction) => {
    const category = normalizeCategory(transaction.category);
    acc[category] = (acc[category] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

const getTrendData = transactions => {
  const totalsByWeek = transactions.reduce((acc, transaction) => {
    const day = new Date(`${transaction.date}T00:00:00`).getDate();
    const week = Math.ceil(day / 7);
    const label = `Semana ${week}`;

    acc[label] = (acc[label] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  let accumulated = 0;

  return Object.entries(totalsByWeek)
    .sort(([weekA], [weekB]) => Number(weekA.slice(-1)) - Number(weekB.slice(-1)))
    .map(([label, total]) => {
      accumulated += total;

      return {
        label,
        total: accumulated
      };
    });
};

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [userResponse, transactionsResponse] = await Promise.all([
          fetch(`${API_URL}/user`),
          fetch(`${API_URL}/transactions`)
        ]);

        if (!userResponse.ok || !transactionsResponse.ok) {
          throw new Error("Nao foi possivel carregar os dados da API.");
        }

        const users = await userResponse.json();
        const transactions = await transactionsResponse.json();
        const user = users[0];
        const categoryData = getCategoryData(transactions);
        const trendData = getTrendData(transactions);
        const totalSpent = categoryData.reduce(
          (sum, item) => sum + item.total,
          0
        );

        setDashboardData({
          user,
          transactionsCount: transactions.length,
          categoryData,
          trendData,
          totalSpent,
          balance: user.monthlyIncome - totalSpent
        });
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadDashboardData();
  }, []);

  return (
    <BrowserRouter>
      {status === "loading" && (
        <div className="status-panel">Carregando análise de consumo...</div>
      )}

      {status === "error" && (
        <div className="status-panel">
          Não foi possível carregar a API. Rode npm run api em outro terminal e
          atualize a página.
        </div>
      )}

      {status === "success" && (
        <Dashboard
          balance={dashboardData.balance}
          data={dashboardData.categoryData}
          monthlyData={dashboardData.trendData}
          totalSpent={dashboardData.totalSpent}
          transactionsCount={dashboardData.transactionsCount}
          user={dashboardData.user}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
