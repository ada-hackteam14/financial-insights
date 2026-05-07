import Chart from "react-apexcharts";
import { getCategoryColor, moneyFormatter } from "./chartTheme";

const PieChart = ({ data, dominant, total }) => {
  const series = data.map(item => item.total);
  const labels = data.map(item => item.category);
  const colors = data.map(item => getCategoryColor(item.category));
  const dominantPercent = total > 0 ? (dominant.total / total) * 100 : 0;

  const options = {
    chart: {
      foreColor: "#4b5563",
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
              color: "#6b7280",
              fontSize: "13px"
            },
            value: {
              show: true,
              color: "#4c1d95",
              fontSize: "22px",
              fontWeight: 800,
              formatter: val => moneyFormatter(Number(val))
            },
            total: {
              show: true,
              label: "Maior gasto",
              color: "#6b7280",
              formatter: () => dominant.category
            }
          }
        }
      }
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#4b5563"
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
      y: {
        formatter: val => moneyFormatter(val)
      }
    }
  };

  return (
    <div className="bg-gray-50 border border-purple-100 rounded-3xl p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Para onde vai seu dinheiro?
      </h2>
      <Chart options={options} series={series} type="donut" height={340} />
      <p className="rounded-2xl bg-purple-50 text-purple-900 p-4 mt-3 leading-relaxed">
        {dominant.category} concentra {dominantPercent.toFixed(1)}% dos gastos.
        Esse é o principal ponto de atenção para economizar.
      </p>
    </div>
  );
};

export default PieChart;
