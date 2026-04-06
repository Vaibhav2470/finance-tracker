import { useState } from "react";
import { Transaction, useApp } from "@/context/AppContext";
import { TransactionModal } from "@/components/TransactionModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";

type Props = {
  transaction: Transaction;
  index: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  Healthcare: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  Entertainment: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  Shopping: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
  Food: "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  Investment: "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800",
  Transport: "bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800",
  Housing: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
  Income: "bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  Other: "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

export const TransactionRow = ({ transaction, index }: Props) => {
  const { deleteTransaction, role } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const catClass = CATEGORY_COLORS[transaction.category] ?? CATEGORY_COLORS.Other;
  const delay = Math.min(index * 0.03, 0.5);

  return (
    <>
      <tr
        className="align-middle border-slate-200 dark:border-slate-800 border-b border-solid hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors duration-100 animate-row-in"
        style={{ animationDelay: `${delay}s` }}
      >
        <td className="font-medium align-middle p-2 text-slate-700 dark:text-slate-300 hidden sm:table-cell whitespace-nowrap">
          {transaction.date}
        </td>
        <td className="align-middle p-2">
          <div className="flex flex-col">
            <span className="font-medium text-slate-800 dark:text-slate-100">{transaction.description}</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs leading-4">{transaction.merchant}</span>
            <span className="text-slate-400 dark:text-slate-500 text-xs leading-4 sm:hidden mt-0.5">{transaction.date}</span>
          </div>
        </td>
        <td className="align-middle p-2 hidden md:table-cell">
          <span className={`relative text-xs font-medium items-center inline-flex leading-4 text-nowrap border px-2.5 py-0.5 rounded-[10px] border-solid transition-colors ${catClass}`}>
            {transaction.category}
          </span>
        </td>
        <td className={`font-medium align-middle p-2 text-right whitespace-nowrap ${transaction.isIncome ? "text-teal-600 dark:text-teal-400" : "text-slate-800 dark:text-slate-200"}`}>
          {transaction.amount}
        </td>
        {role === "Admin" && (
          <td className="align-middle p-2 text-right">
            <div className="gap-x-1 flex justify-end gap-y-1">
              <button
                onClick={() => setShowEdit(true)}
                className="font-medium items-center bg-transparent gap-x-2 flex h-8 w-8 justify-center text-center z-0 border p-0 rounded-[10px] border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-150 active:scale-90"
                title="Edit transaction"
              >
                <img
                  src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-10.svg"
                  alt="edit"
                  className="shrink-0 h-4 w-4 dark:invert dark:opacity-70"
                />
              </button>
              <button
                onClick={() => setShowDelete(true)}
                className="font-medium items-center bg-transparent gap-x-2 flex h-8 w-8 justify-center text-center z-0 border p-0 rounded-[10px] border-transparent hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-100 dark:hover:border-red-800 transition-all duration-150 active:scale-90"
                title="Delete transaction"
              >
                <img
                  src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-11.svg"
                  alt="delete"
                  className="shrink-0 h-4 w-4"
                />
              </button>
            </div>
          </td>
        )}
      </tr>

      {showEdit && (
        <TransactionModal
          mode="edit"
          transaction={transaction}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showDelete && (
        <DeleteConfirmModal
          description={transaction.description}
          onConfirm={() => { deleteTransaction(transaction.id); setShowDelete(false); }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
};
