import TransactionItem from "./TransactionItem";

export default function TransactionList(props) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-purple-100
        p-4
        sm:p-5
        md:p-6
        shadow-sm
        w-full
      "
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
          mb-6
        "
      >
        <h2
          className="
            text-lg
            sm:text-xl
            font-bold
            text-gray-900
          "
        >
          Extrato
        </h2>

        <button
          className="
            text-purple-600
            text-sm
            font-medium
            self-start
            sm:self-auto
          "
        >
          Ver todos
        </button>
      </div>

      <div>
        {props.transactions.map((item) => (
          <TransactionItem
            key={item.id}
            description={item.description}
            category={item.category}
            amount={item.amount}
          />
        ))}
      </div>
    </div>
  );
}