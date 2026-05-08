import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getCategoryColor, moneyFormatter } from "./chartTheme";

interface BarData {
  category: string;
  total: number;
}

interface BarChartProps {
  data: BarData[];
}

const BarChart = ({ data }: BarChartProps): React.JSX.Element => {
  const categories = data.map((item) => item.category);
  const values = data.map((item) => item.total);
  const colors = data.map((item) => getCategoryColor(item.category));

  const options: ApexOptions = {
    chart: {
      foreColor: "#4b5563",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "42%",
        distributed: true,
      },
    },
    xaxis: {
      categories,
      labels: {
        rotate: -20,
        rotateAlways: true,
        hideOverlappingLabels: false,
        trim: false,
        style: {
          colors: "#4b5563",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#4b5563",
        },
        formatter: (val) => moneyFormatter(val),
      },
    },
    grid: {
      borderColor: "rgba(107, 114, 128, 0.18)",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: (val) => moneyFormatter(val),
      },
    },
    colors,
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.08,
        } as any,
      },
    },
  };

  const series = [{ name: "Gastos", data: values }];

  return (
    <div className="bg-gray-50 border border-purple-100 rounded-3xl p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Comparação de gastos
      </h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
