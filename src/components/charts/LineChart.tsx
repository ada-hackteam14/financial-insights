import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { moneyFormatter } from "./chartTheme";

interface DataPoint {
  total: number;
  label: string;
}

interface LineChartProps {
  data: DataPoint[];
}

const compactMoneyFormatter = (value: number | string): string => {
  const numValue = Number(value);
  return numValue >= 1000
    ? `R$ ${(numValue / 1000).toLocaleString("pt-BR", {
        maximumFractionDigits: 1,
      })} mil`
    : moneyFormatter(numValue);
};

const LineChart = ({ data }: LineChartProps): React.JSX.Element => {
  const values = data.map((item) => item.total);
  const categories = data.map((item) => item.label);

  const startValue = values[0] || 0;
  const endValue = values[values.length - 1] || 0;
  const growth = endValue - startValue;

  const options: ApexOptions = {
    chart: {
      foreColor: "#4b5563",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories,
      tickAmount: 5,
      axisBorder: {
        color: "rgba(107, 114, 128, 0.22)",
      },
      axisTicks: {
        color: "rgba(107, 114, 128, 0.22)",
      },
      labels: {
        style: {
          colors: "#4b5563",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        style: {
          colors: "#4b5563",
          fontSize: "12px",
        },
        formatter: (val) => compactMoneyFormatter(val),
      },
    },
    grid: {
      borderColor: "rgba(107, 114, 128, 0.14)",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.28,
        opacityTo: 0.03,
        stops: [0, 80, 100],
      },
    },
    tooltip: {
      marker: {
        show: false,
      },
      y: {
        formatter: (val) => moneyFormatter(val),
      },
    },
    colors: ["#8B5CF6"],
  };

  const series = [{ name: "Gasto acumulado", data: values }];

  return (
    <div className="bg-gray-50 border border-purple-100 rounded-3xl p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Evolução dos gastos no mês
      </h2>
      <Chart options={options} series={series} type="area" height={280} />
      <p className="rounded-2xl bg-purple-50 text-purple-900 p-4 mt-3 leading-relaxed">
        O gasto acumulado cresceu {moneyFormatter(growth)} no período analisado.
      </p>
    </div>
  );
};

export default LineChart;
