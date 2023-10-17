import { ActiveLink } from "../atoms/ActiveLink";
import { SearchProducts } from "../molecules/SearchProducts";
import { CategoryNavbarItem } from "../molecules/CategoryNavbar";
import { getCategoriesList } from "@/api/categories";
import { UserCartIcon } from "../molecules/UserShoppingIcon";
import { getCartFromCookies } from "@/api/carts";

export async function Navbar() {
  const categories = await getCategoriesList();
  const cart = await getCartFromCookies();
  const quantity = await cart?.orderItems.reduce(
    (acc, order) => acc + order.quantity,
    0
  );

  const activeLinkProps = {
    className:
      "text-blue-600 font-normal border-b-2 hover:border-blue-600 py-3 px-4 -mb-0.5 transition-colors transition-all",
    activeClassName:
      "border-b-2 border-blue-600 hover:no-underline	font-semibold",
  };

  return (
    <div className="w-full sticky top-0 z-10 border-2 border-b-gray-200 backdrop-blur-md">
      <div className="w-full flex max-w-lg md:max-w-4xl lg:max-w-7xl  mx-auto">
        <nav className="w-full h-full mx-auto flex gap-x-4 items-center hover:bottom-2">
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
        </nav>
        <div className="w-full h-full mx-auto flex gap-x-4 items-center hover:bottom-2">
          <SearchProducts className="ml-auto" />
          <UserCartIcon
            activeLinkProps={activeLinkProps}
            quantity={quantity ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
