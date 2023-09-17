import { ProductListItem } from "../moleculs/ProductListItem";
import { ProductItemType } from "../types";

export type ProductListProps = {
  products: ProductItemType[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul
      className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      data-testid="products-list"
    >
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
