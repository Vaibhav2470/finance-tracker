export type NavItemProps = {
  href: string;
  iconSrc: string;
  label: string;
  variantClass: string;
};

export const NavItem = (props: NavItemProps) => {
  return (
    <a
      href={props.href}
      className={`text-sm font-medium items-center box-border caret-transparent gap-x-3 flex shrink-0 leading-5 min-h-[auto] min-w-[auto] gap-y-3 px-3 py-2.5 rounded-[10px] ${props.variantClass}`}
    >
      <img
        src={props.iconSrc}
        alt="Icon"
        className="box-border caret-transparent h-4 w-4"
      />
      {props.label}
    </a>
  );
};
