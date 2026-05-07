import Chart from "react-apexcharts";
import { getCategoryColor, moneyFormatter } from "./chartTheme";

const PieChart = ({ data, dominant, total }) => {
  const series = data.map(item => item.total);
  const labels = data.map(item => item.category);
  const colors = data.map(item => getCategoryColor(item.category));
  const dominantPercent = (dominant.total / total) * 100;

  const options = {
    chart: {
      foreColor: "#e5e7eb",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 900
      }
    },
    labels,
    colors,
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
          labels: {
            show: true,
            name: {
              show: true,
              color: "#cbd5e1",
              fontSize: "13px"
            },
            value: {
              show: true,
              color: "#f8fafc",
              fontSize: "22px",
              fontWeight: 800,
              formatter: val => moneyFormatter(Number(val))
            },
            total: {
              show: true,
              label: "Maior gasto",
              color: "#cbd5e1",
              formatter: () => dominant.category
            }
          }
        }
      }
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#e5e7eb"
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#ffffff"],
        fontWeight: 700
      },
      dropShadow: {
        enabled: true,
        blur: 2,
        opacity: 0.45
      },
      formatter: val => `${val.toFixed(1)}%`
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: val => moneyFormatter(val)
      }
    }
  };

  return (
    <div className="chart-card">
      <h2>Para onde vai seu dinheiro?</h2>
      <Chart options={options} series={series} type="donut" height={340} />
      <p className="chart-insight">
        {dominant.category} concentra {dominantPercent.toFixed(1)}% dos gastos.
        Esse é o principal ponto de atenção para economizar.
      </p>
    </div>
  );
};

export default PieChart;
