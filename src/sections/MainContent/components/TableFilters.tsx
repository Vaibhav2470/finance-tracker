import { useState, useRef, useEffect } from "react";
import { useApp, CATEGORIES } from "@/context/AppContext";

export const TableFilters = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="items-center gap-x-4 flex flex-col gap-y-4 mb-8 md:flex-row animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="relative max-w-none w-full md:max-w-xs">
        <img
          src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-8.svg"
          alt="search"
          className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 opacity-40 dark:invert pointer-events-none"
        />
        <input
          placeholder="Search descriptions, merchants..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="text-sm bg-white dark:bg-slate-900 shadow-sm flex h-9 leading-5 w-full border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1 rounded-[10px] outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all dark:text-slate-200 dark:placeholder-slate-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="relative w-full md:w-auto" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`text-sm font-medium items-center bg-white dark:bg-slate-900 shadow-sm gap-x-2 flex justify-center leading-5 h-9 gap-y-2 text-center text-nowrap w-full px-4 py-2 rounded-[10px] border transition-all duration-150 md:w-auto dark:text-slate-200
            ${dropdownOpen ? "border-teal-500 ring-2 ring-teal-500/20" : "border-black/10 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"}`}
        >
          <img
            src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-9.svg"
            alt="filter"
            className="shrink-0 h-4 w-4 mr-1 dark:invert dark:opacity-70"
          />
          {selectedCategory}
          <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""} text-slate-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[10px] shadow-lg z-30 py-1 animate-scale-in">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors
                  ${selectedCategory === cat
                    ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
