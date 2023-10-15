import { getCollectionsList } from "@/api/collections";
import { getProductsList } from "@/api/products";
import { PageHeader } from "@/ui/atoms/PageHeader";
import { CollectionList } from "@/ui/organisms/CollectionList";
import { ProductList } from "@/ui/organisms/ProductList";
import { redirect } from "next/navigation";

const PAGE_SIZE = 4;
const PAGE_NUMBER = 1;

export default async function Home() {
  const { data: products } = await getProductsList(
    PAGE_SIZE,
    PAGE_NUMBER
  );

  const collections = await getCollectionsList();
    redirect("/products?order=price-desc")
  return (
    <>
      <section className="mx-auto max-w-2xl px-8 pt-12 pb-4 sm:px-6 sm:py-4 md:max-w-4xl lg:max-w-7xl">
        <PageHeader title="Newest collections" name={""} />
        <CollectionList collections={collections} />
      </section>
      <section className="mx-auto max-w-2xl px-8 pb-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
        <PageHeader title="Our products" name={""} />
        <ProductList products={products} />
      </section>
    </>
  );
}