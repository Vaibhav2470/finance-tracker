import { useApp } from "@/context/AppContext";

export const SidebarFooter = () => {
  const { isDark, toggleDark } = useApp();

  return (
    <div className="border-slate-200 dark:border-slate-800 p-4 border-t border-solid md:p-6 transition-colors duration-300">
      <button
        onClick={toggleDark}
        className="text-slate-500 dark:text-slate-400 text-sm font-medium items-center bg-transparent gap-x-3 flex leading-5 gap-y-3 text-center w-full px-3 py-2.5 rounded-[10px] hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 group"
      >
        <span className="h-4 w-4 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
          {isDark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </span>
        {isDark ? "Light Mode" : "Dark Mode"}
        <span className={`ml-auto w-8 h-4 rounded-full transition-all duration-300 flex items-center px-0.5 ${isDark ? "bg-teal-600" : "bg-slate-200 dark:bg-slate-700"}`}>
          <span className={`w-3 h-3 rounded-full bg-white shadow transition-transform duration-300 ${isDark ? "translate-x-4" : "translate-x-0"}`} />
        </span>
      </button>
    </div>
  );
};
