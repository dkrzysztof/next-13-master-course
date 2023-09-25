import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { ProductItemType } from "@/ui/types";

export default async function Products() {
  const products = await getProductsList();

  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      <ProductList products={products} />
    </section>
  );
}
