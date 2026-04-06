import { useState } from "react";
import { useApp } from "@/context/AppContext";

type Props = { mobile?: boolean };

const NAV_ITEMS = [
  //{ label: "Dashboard", icon: "https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-3.svg", href: "#" },
  { label: "Transactions", icon: "https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-4.svg", href: "#transactions", active: true },
  //{ label: "Insights", icon: "https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-5.svg", href: "#" },
];

export const SidebarViewAs = ({ mobile }: Props) => {
  const { setMobileMenuOpen, role, setRole } = useApp();
  const [activeNav, setActiveNav] = useState("Transactions");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 px-2">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-[0.6px] leading-4 uppercase mb-2">
          View As
        </p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(prev => !prev)}
            className="text-sm items-center bg-gray-50 dark:bg-slate-800 shadow-sm flex h-9 justify-between leading-5 text-center w-full border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-[10px] hover:border-teal-400 dark:hover:border-teal-600 transition-colors dark:text-slate-200"
          >
            <span className="overflow-hidden text-nowrap">{role}</span>
            <img
              src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-2.svg"
              alt="Chevron"
              className={`h-4 w-4 opacity-50 dark:invert dark:opacity-40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[10px] shadow-lg overflow-hidden animate-fade-in-fast">
              {(["Admin", "Viewer"] as const).map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => { setRole(option); setDropdownOpen(false); }}
                  className={`w-full text-left text-sm px-3 py-2 transition-colors duration-100
                    ${role === option
                      ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <nav className="flex flex-col gap-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                setActiveNav(item.label);
                if (mobile) setMobileMenuOpen(false);
              }}
              className={`text-sm font-medium items-center gap-x-3 flex leading-5 px-3 py-2.5 rounded-[10px] transition-all duration-150 group
                ${isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`h-4 w-4 transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"} dark:invert dark:opacity-70`}
              />
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
