import { NavItem } from "@/sections/Sidebar/components/NavItem";

export const SidebarNav = () => {
  return (
    <nav className="box-border caret-transparent gap-x-1 flex flex-row gap-y-1 overflow-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
      <NavItem
        href="/"
        iconSrc="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-3.svg"
        label="Dashboard"
        variantClass="text-slate-500 text-sm font-medium items-center box-border caret-transparent gap-x-3 flex shrink-0 leading-5 min-h-[auto] min-w-[auto] gap-y-3 px-3 py-2.5 rounded-[10px]"
      />
      <NavItem
        href="/transactions"
        iconSrc="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-4.svg"
        label="Transactions"
        variantClass="bg-slate-100"
      />
      <NavItem
        href="/insights"
        iconSrc="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-5.svg"
        label="Insights"
        variantClass="text-slate-500"
      />
    </nav>
  );
};
