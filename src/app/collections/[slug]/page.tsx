import {
  getCollectionBySlug,
} from "@/api/collections";
import { PageHeader } from "@/ui/atoms/PageHeader";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateMetadata = async ({
  params: { slug },
}: CollectionsPageProps) => {
  const collection = await getCollectionBySlug(slug);
  return {
    title: `${collection.name} - Clothers Shop`,
    description: collection.description,
    image: collection.image.url,
  };
};

type CollectionsPageProps = {
  params: { slug: string };
};

export default async function CollectionsPage({
  params: { slug },
}: CollectionsPageProps) {
  const { name, products, description } =
    await getCollectionBySlug(slug);

  return (
    <section className="mx-auto max-w-2xl px-8 py-6 sm:px-6 sm:py-8 md:max-w-4xl lg:max-w-7xl">
      <PageHeader title={name} name="Collection" />
      <div>{description}</div>
      <ProductList products={products || []}/>
    </section>
  );
}
