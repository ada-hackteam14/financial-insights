import "../../styles/dashboard.css";

import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import { moneyFormatter } from "../charts/chartTheme";

const Dashboard = ({
  balance,
  data,
  monthlyData,
  totalSpent,
  transactionsCount,
  user
}) => {
  const total = totalSpent || data.reduce((sum, item) => sum + item.total, 0);
  const dominant = data.reduce((max, item) =>
    item.total > max.total ? item : max
  );
  const dominantPercent = (dominant.total / total) * 100;
  const possibleSavings = dominant.total * 0.1;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">Consumer Insight Intelligence</span>
          <h1>Olá, {user.name}</h1>
        </div>
        <p>
          Seu consumo este mês está concentrado em {dominant.category}. Os
          gráficos abaixo transformam suas transações em decisões rápidas de
          economia.
        </p>
      </div>

      <div className="insights-grid">
        <div className="insight-card insight-card--primary">
          <h2>Categoria dominante</h2>
          <p>{dominant.category}</p>
          <span>{moneyFormatter(dominant.total)}</span>
        </div>

        <div className="insight-card">
          <h2>Participação dominante</h2>
          <p>{dominantPercent.toFixed(1)}%</p>
          <span>do total está em {dominant.category}</span>
        </div>

        <div className="insight-card">
          <h2>Saldo restante</h2>
          <p>{moneyFormatter(balance)}</p>
          <span>{transactionsCount} transações analisadas</span>
        </div>

        <div className="insight-card">
          <h2>Economia possível</h2>
          <p>{moneyFormatter(possibleSavings)}</p>
          <span>reduzindo 10% em {dominant.category}</span>
        </div>
      </div>

      <div className="charts-grid">
        <PieChart data={data} dominant={dominant} total={total} />
        <BarChart data={data} />
        <LineChart data={monthlyData} />
      </div>
    </div>
  );
};

export default Dashboard;
