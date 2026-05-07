export default function TransactionItem(props) {
  return (
    <div
      className="
        flex
        items-start
        sm:items-center
        justify-between
        gap-4
        py-4
        border-b
        border-gray-100
        hover:bg-gray-50
        rounded-xl
        p-2
      "
    >
      <div className="min-w-0">
        <p
          className="
            font-medium
            text-gray-800
            text-sm
            sm:text-base
            truncate
          "
        >
          {props.description}
        </p>

        <p
          className="
            text-xs
            sm:text-sm
            text-gray-500
          "
        >
          {props.category}
        </p>
      </div>

      <p
        className="
          font-bold
          text-purple-600
          text-sm
          sm:text-base
          whitespace-nowrap
        "
      >
        -R$ {props.amount}
      </p>
    </div>
  );
}