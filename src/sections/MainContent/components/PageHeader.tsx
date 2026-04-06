import { useState } from "react";
import { TransactionModal } from "@/components/TransactionModal";
import { useApp } from "@/context/AppContext";

export const PageHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { role } = useApp();

  return (
    <>
      <div className="gap-x-4 flex flex-col justify-between gap-y-4 mb-8 md:items-end md:flex-row animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.75px] leading-9 dark:text-slate-100">
            Transactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and view your financial records.
          </p>
        </div>
        {role === "Admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="relative text-white text-sm font-medium items-center bg-teal-600 hover:bg-teal-700 active:scale-[0.98] gap-x-2 flex justify-center leading-5 h-9 gap-y-2 text-center text-nowrap px-4 py-2 rounded-[10px] transition-all duration-150 shadow-sm"
          >
            <img
              src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-7.svg"
              alt="add"
              className="shrink-0 h-4 w-4 mr-2"
            />
            Add Transaction
          </button>
        )}
      </div>
      {showModal && (
        <TransactionModal mode="add" onClose={() => setShowModal(false)} />
      )}
    </>
  );
};
