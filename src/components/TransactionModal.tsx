import React, { useState, useEffect } from "react";
import { Transaction, CATEGORIES, useApp } from "@/context/AppContext";

type Props = {
  mode: "add" | "edit";
  transaction?: Transaction;
  onClose: () => void;
};

const parseAmount = (amount: string) => {
  const isIncome = amount.startsWith("+");
  const numeric = amount.replace(/[+\-$,]/g, "");
  return { isIncome, numeric };
};

export const TransactionModal: React.FC<Props> = ({ mode, transaction, onClose }) => {
  const { addTransaction, updateTransaction } = useApp();

  const [description, setDescription] = useState(transaction?.description ?? "");
  const [merchant, setMerchant] = useState(transaction?.merchant ?? "");
  const [category, setCategory] = useState(transaction?.category ?? "Food");
  const [amountVal, setAmountVal] = useState(() => transaction ? parseAmount(transaction.amount).numeric : "");
  const [isIncome, setIsIncome] = useState(transaction?.isIncome ?? false);
  const [date, setDate] = useState(transaction?.date ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!description.trim()) e.description = "Description is required";
    if (!merchant.trim()) e.merchant = "Merchant is required";
    if (!amountVal || isNaN(parseFloat(amountVal)) || parseFloat(amountVal) <= 0) e.amount = "Enter a valid amount";
    if (!date.trim()) e.date = "Date is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const formatted = `${isIncome ? "+" : "-"}$${parseFloat(amountVal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const payload = { date, description, merchant, category, amount: formatted, isIncome };
    if (mode === "add") addTransaction(payload);
    else if (transaction) updateTransaction({ ...payload, id: transaction.id });
    setSubmitted(true);
    setTimeout(onClose, 600);
  };

  const inputClass = (field: string) =>
    `w-full h-9 bg-gray-50 dark:bg-slate-800 border rounded-[10px] px-3 py-1 text-sm leading-5 outline-none transition-all duration-150 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:text-slate-100 dark:placeholder-slate-500 ${errors[field] ? "border-red-400 focus:ring-red-400" : "border-slate-200 dark:border-slate-700"}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in border border-slate-200 dark:border-slate-700">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 gap-3 animate-fade-in">
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {mode === "add" ? "Transaction Added!" : "Changes Saved!"}
            </p>
          </div>
        ) : (
          <>
<div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold tracking-tight dark:text-slate-100">
                {mode === "add" ? "Add Transaction" : "Edit Transaction"}
              </h2>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Description</label>
                  <input className={inputClass("description")} value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Weekly groceries" />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Merchant</label>
                  <input className={inputClass("merchant")} value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Whole Foods" />
                  {errors.merchant && <p className="text-xs text-red-500">{errors.merchant}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Amount ($)</label>
                  <input className={inputClass("amount")} type="number" min="0.01" step="0.01" value={amountVal} onChange={e => setAmountVal(e.target.value)} placeholder="0.00" />
                  {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date</label>
                  <input className={inputClass("date")} value={date} onChange={e => setDate(e.target.value)} placeholder="Mar 28, 2026" />
                  {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Category</label>
                  <select className={`${inputClass("category")} cursor-pointer`} value={category} onChange={e => setCategory(e.target.value)}>
                    {CATEGORIES.filter(c => c !== "All Types").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Type</label>
                  <div className="flex gap-2 h-9 items-center">
                    <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 h-9 rounded-[10px] text-sm font-medium border transition-all ${!isIncome ? "bg-red-50 border-red-300 text-red-600 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400" : "bg-gray-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}>Expense</button>
                    <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 h-9 rounded-[10px] text-sm font-medium border transition-all ${isIncome ? "bg-teal-50 border-teal-300 text-teal-600 dark:bg-teal-900/30 dark:border-teal-700 dark:text-teal-400" : "bg-gray-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`}>Income</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={onClose} className="flex-1 h-9 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-[10px] border border-slate-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 h-9 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white text-sm font-medium rounded-[10px] transition-all">
                  {mode === "add" ? "Add Transaction" : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
