import { useState } from "react";
import { SidebarHeader } from "@/sections/Sidebar/components/SidebarHeader";
import { SidebarViewAs } from "@/sections/Sidebar/components/SidebarViewAs";
import { SidebarFooter } from "@/sections/Sidebar/components/SidebarFooter";
import { useApp } from "@/context/AppContext";

export const Sidebar = () => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useApp();

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 sticky top-0 z-40 transition-colors duration-300">
        <SidebarHeader />
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm animate-fade-in-fast"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col gap-y-6 p-4">
          <div className="flex items-center justify-between">
            <SidebarHeader />
            <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SidebarViewAs mobile />
        </div>
        <SidebarFooter />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col justify-between sticky top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-300 animate-slide-in-left">
        <div className="flex flex-col gap-y-6 p-6">
          <SidebarHeader />
          <SidebarViewAs />
        </div>
        <SidebarFooter />
      </aside>
    </>
  );
};
