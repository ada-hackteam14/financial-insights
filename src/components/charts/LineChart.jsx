import Chart from "react-apexcharts";
import { moneyFormatter } from "./chartTheme";

const compactMoneyFormatter = value =>
  Number(value) >= 1000
    ? `R$ ${(Number(value) / 1000).toLocaleString("pt-BR", {
        maximumFractionDigits: 1
      })} mil`
    : moneyFormatter(value);

const LineChart = ({ data }) => {
  const values = data.map(item => item.total);
  const categories = data.map(item => item.label);
  const startValue = values[0] || 0;
  const endValue = values[values.length - 1] || 0;
  const growth = endValue - startValue;

  const options = {
    chart: {
      foreColor: "#e5e7eb",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    markers: {
      size: 0,
      hover: {
        size: 6
      }
    },
    xaxis: {
      categories,
      tickAmount: 5,
      axisBorder: {
        color: "rgba(148, 163, 184, 0.22)"
      },
      axisTicks: {
        color: "rgba(148, 163, 184, 0.22)"
      },
      labels: {
        style: {
          colors: "#cbd5e1",
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        style: {
          colors: "#cbd5e1",
          fontSize: "12px"
        },
        formatter: val => compactMoneyFormatter(val)
      }
    },
    grid: {
      borderColor: "rgba(148, 163, 184, 0.14)",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.28,
        opacityTo: 0.03,
        stops: [0, 80, 100]
      }
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: false
      },
      y: {
        formatter: val => moneyFormatter(val)
      }
    },
    colors: ["#8B5CF6"]
  };

  const series = [{ name: "Gasto acumulado", data: values }];

  return (
    <div className="chart-card chart-card--wide">
      <h2>Evolução dos gastos no mês</h2>
      <Chart options={options} series={series} type="area" height={280} />
      <p className="chart-insight">
        O gasto acumulado cresceu {moneyFormatter(growth)} no período analisado.
      </p>
    </div>
  );
};

export default LineChart;
