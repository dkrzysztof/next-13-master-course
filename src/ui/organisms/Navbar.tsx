import { ActiveLink } from "../atoms/ActiveLink";

export const Navbar = () => {
  const activeLinkProps = {
    className:
      "text-blue-400 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-xl transition-colors",
    activeClassName: "border-b-slate-500 bg-blue-500",
  };

  return (
    <nav className="w-full flex justify-center gap-x-8 mt-3">
      <ActiveLink href="/" exact {...activeLinkProps}>
        Home
      </ActiveLink>
      <ActiveLink href="/products" {...activeLinkProps}>
        All
      </ActiveLink>
    </nav>
  );
};
