import { ActiveLink } from "../atoms/ActiveLink";
import { SearchProducts } from "../molecules/SearchProducts";

export const Navbar = () => {
  const activeLinkProps = {
    className:
      "text-blue-600 border-blue-600 font-light hover:font-semibold hover:text-blue-600 py-3 px-4 -mb-px transition-colors transition-all",
    activeClassName:
      "border-b-2 font-semibold",
  };

  return (
    <nav className="w-full sticky top-0 z-10 border-2 border-b-gray-200 backdrop-blur-md">
      <div className="w-full h-full mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl flex gap-x-4 items-center hover:bottom-2">
        <ActiveLink href="/" exact {...activeLinkProps}>
          Home
        </ActiveLink>
        <ActiveLink href="/products" {...activeLinkProps}>
          All
        </ActiveLink>
        <ActiveLink href="/categories" {...activeLinkProps}>
          Categories
        </ActiveLink>
        <ActiveLink
          href="/collections"
          {...activeLinkProps}
        >
          Collections
        </ActiveLink>
        <SearchProducts className="ml-auto" />
      </div>
    </nav>
  );
};
