import { useApp } from "@/context/AppContext";
import { TransactionRow } from "@/sections/MainContent/components/TransactionRow";

export const TransactionTable = () => {
  const { transactions, searchQuery, selectedCategory, role } = useApp();

  const filtered = transactions.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || t.description.toLowerCase().includes(q) || t.merchant.toLowerCase().includes(q);
    const matchesCat = selectedCategory === "All Types" || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-colors duration-300 animate-fade-in" style={{ animationDelay: "0.15s" }}>
      <div className="relative w-full overflow-auto">
        <table className="text-sm leading-5 w-full border-collapse">
          <thead>
            <tr className="align-middle border-slate-200 dark:border-slate-800 border-b border-solid">
              <th className="text-slate-500 dark:text-slate-400 font-medium h-10 text-left align-middle w-[120px] px-2 py-0 hidden sm:table-cell">
                Date
              </th>
              <th className="text-slate-500 dark:text-slate-400 font-medium h-10 text-left align-middle px-2 py-0">
                Description
              </th>
              <th className="text-slate-500 dark:text-slate-400 font-medium h-10 text-left align-middle px-2 py-0 hidden md:table-cell">
                Category
              </th>
              <th className="text-slate-500 dark:text-slate-400 font-medium h-10 text-right align-middle px-2 py-0">
                Amount
              </th>
              {role === "Admin" && (
                <th className="text-slate-500 dark:text-slate-400 font-medium h-10 text-right align-middle w-[100px] px-2 py-0">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">No transactions found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((t, i) => (
                <TransactionRow key={t.id} transaction={t} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {filtered.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Showing {filtered.length} of {transactions.length} transactions</span>
          <span>
            {filtered.filter(t => t.isIncome).length} income &middot; {filtered.filter(t => !t.isIncome).length} expenses
          </span>
        </div>
      )}
    </div>
  );
};
