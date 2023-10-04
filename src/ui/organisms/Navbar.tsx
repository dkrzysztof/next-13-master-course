import { ActiveLink } from "../atoms/ActiveLink";

export const Navbar = () => {
  const activeLinkProps = {
    className:
      "text-blue-400 hover:text-blue-600 py-2 px-4 -mb-px transition-colors",
    activeClassName: "border-b-4 border-blue-500 text-blue-500",
  };

  return (
    <nav className="w-full h-12 sticky top-0 z-10 border-2 border-b-gray-200 backdrop-blur-md">
      <div className="w-full h-full max-w-4xl mx-auto flex gap-x-4 align-middle">
        <ActiveLink href="/" exact {...activeLinkProps}>
          Home
        </ActiveLink>
        <ActiveLink href="/products" {...activeLinkProps}>
          All
        </ActiveLink>
        <ActiveLink href="/categories" {...activeLinkProps}>
          Categories
        </ActiveLink>
        <ActiveLink href="/collections" {...activeLinkProps}>
          Collections
        </ActiveLink>
      </div>
    </nav>
  );
};
