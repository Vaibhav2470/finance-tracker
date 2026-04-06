import React from "react";

type Props = {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal: React.FC<Props> = ({ description, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm animate-scale-in border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Delete Transaction</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">&#34;{description}&#34; will be permanently removed.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 h-9 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-[10px] border border-slate-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 h-9 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white text-sm font-medium rounded-[10px] transition-all">Delete</button>
        </div>
      </div>
    </div>
  );
};
