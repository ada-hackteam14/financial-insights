import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import TransactionItem from "./TransactionItem";

export default function TransactionList(props) {
  const [expanded, setExpanded] = useState(false);

  const visibleTransactions = expanded
    ? props.transactions
    : props.transactions.slice(0, 6);

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
          onClick={() => setExpanded(!expanded)}
          className="
            flex
            items-center
            gap-2

            text-purple-600
            text-sm
            font-medium

            self-start
            sm:self-auto

            transition-all
            duration-300

            hover:text-purple-800
          "
        >
          {expanded ? "Mostrar menos" : "Ver todos"}

          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <div
        className="
          transition-all
          duration-300
          animate-fade
          max-h-[500px]
          overflow-y-auto
          bg-gradient-to-t from-white to-transparent
        "
      >
        {visibleTransactions.map((item) => (
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
