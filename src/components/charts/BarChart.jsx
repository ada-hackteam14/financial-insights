import Chart from "react-apexcharts";
import { getCategoryColor, moneyFormatter } from "./chartTheme";

const BarChart = ({ data }) => {
  const categories = data.map(item => item.category);
  const values = data.map(item => item.total);
  const colors = data.map(item => getCategoryColor(item.category));

  const options = {
    chart: {
      foreColor: "#e5e7eb",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "42%"
      }
    },
    xaxis: {
      categories,
      labels: {
        rotate: -20,
        rotateAlways: true,
        hideOverlappingLabels: false,
        trim: false,
        style: {
          colors: "#cbd5e1",
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#cbd5e1"
        },
        formatter: val => moneyFormatter(val)
      }
    },
    grid: {
      borderColor: "rgba(148, 163, 184, 0.18)"
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: val => moneyFormatter(val)
      }
    },
    colors,
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.08
        }
      }
    }
  };

  const series = [{ name: "Gastos", data: values }];

  return (
    <div className="chart-card">
      <h2>Comparação de gastos</h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
