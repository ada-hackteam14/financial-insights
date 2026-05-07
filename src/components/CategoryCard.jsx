export default function CategoryCard(props) {
  return (
    <div
      className="
        bg-gray-50
        border
        border-purple-100
        rounded-3xl
        p-4
        sm:p-5
        shadow-sm
        transition 
        ease-in-out 
        delay-150
        hover:-translate-y-1 
        hover:scale-100
        w-full
      "
    >
      <p
        className="
          text-[10px]
          sm:text-xs
          uppercase
          text-gray-500
          tracking-wider
        "
      >
        {props.category}
      </p>

      <h2
        className="
          text-xl
          sm:text-2xl
          font-bold
          text-purple-800
          mt-3
        "
      >
        R$ {props.value}
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        {props.percentage}% da renda
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div
          className={`h-2 rounded-full ${props.color}`}
          style={{ width: `${props.percentage}%` }}
        />
      </div>
    </div>
  );
}