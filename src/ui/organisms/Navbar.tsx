import { ActiveLink } from "../atoms/ActiveLink";
import { SearchProducts } from "../molecules/SearchProducts";
import { CategoryNavbarItem } from "../molecules/CategoryNavbar";
import { getCategoriesList } from "@/api/categories";
import { UserCartIcon } from "../molecules/UserShoppingIcon";
import { getCartFromCookies } from "@/api/carts";

export async function Navbar() {
  const categories = await getCategoriesList();
  const cart = await getCartFromCookies();

  const activeLinkProps = {
    className:
      "text-blue-600 font-normal border-b-2 hover:border-blue-600 py-3 px-4 -mb-0.5 transition-colors transition-all",
    activeClassName:
      "border-b-2 border-blue-600 hover:no-underline	font-semibold",
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
        {categories.slice(0, 3).map((category) => (
          <CategoryNavbarItem
            category={category}
            key={category.id}
            {...activeLinkProps}
          />
        ))}
        <SearchProducts className="ml-auto" />
        <UserCartIcon activeLinkProps={activeLinkProps} quantity={cart?.order?.orderItems?.length ?? 0}/>
      </div>
    </nav>
  );
}
