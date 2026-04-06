export const SidebarHeader = () => {
  return (
    <div className="items-center gap-x-2 flex px-2">
      <div className="text-white bg-teal-600 p-2 rounded-xl shrink-0">
        <img
          src="https://c.animaapp.com/mnlx6zfw6s2QIw/assets/icon-1.svg"
          alt="FinTrack logo"
          className="h-5 w-5"
        />
      </div>
      <span className="text-lg font-bold tracking-[-0.45px] leading-7 dark:text-slate-100">
        FinTrack
      </span>
    </div>
  );
};
