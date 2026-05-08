export default function SummaryCard(props) {
  return (
    <div
      className="
        bg-gray-50
        border
        border-purple-100
        rounded-2xl
        p-4
        sm:p-5
        md:p-6
        shadow-sm
        w-full
        transition 
        ease-in-out 
        delay-150
        hover:-translate-y-1 
        hover:scale-100
      "
    >
      <p
        className="
          text-[10px]
          sm:text-xs
          uppercase
          tracking-wider
          text-gray-500
        "
      >
        {props.title}
      </p>

      <h2
        className={`
          text-2xl
          sm:text-3xl
          font-bold
          mt-2
          sm:mt-3
          text-purple-800
        `}
      >
        {props.value}
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 mt-2">{props.subtitle}</p>
    </div>
  );
}
