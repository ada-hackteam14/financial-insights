interface CategoryCardProps {
  category: string;
  value: number;
  percentage: number;
  color?: string;
}

export default function CategoryCard({
  category,
  value,
  percentage,
  color = "bg-purple-600",
}: CategoryCardProps): React.ReactElement {
  const formattedValue = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="bg-gray-50 border border-purple-100 rounded-3xl p-4 sm:p-5 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 w-full">
      <p className="text-[10px] sm:text-xs uppercase text-gray-500 tracking-wider">
        {category}
      </p>

      <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mt-3">
        R$ {formattedValue} {/* Exibe o valor formatado */}
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        {percentage.toFixed(0)}% da renda {/* Formata a porcentagem aqui */}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
