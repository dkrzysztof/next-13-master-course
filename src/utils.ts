import type { ProductListFragmentFragment } from "./gql/graphql";
import type { ProductItemType } from "./ui/types";

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount / 100);
};

export const getPages = (
  pageSize: number,
  totalItems: number
) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );
};

export const productFragmentToProductItem = (
  fragment: ProductListFragmentFragment
): ProductItemType => {
  return {
    id: fragment.id,
    name: fragment.name,
    category: fragment.categories[0]?.name || "",
    categorySlug: fragment.slug,
    rating: fragment.rating || 0,
    coverImage: fragment.images[0] && {
      src: fragment.images[0].url,
      alt: fragment.name,
    },
    price: fragment.price,
    description: fragment.description,
  };
};
