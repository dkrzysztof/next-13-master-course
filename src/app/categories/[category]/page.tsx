import { redirect } from "next/navigation";

type CategoryProductsIndexPageProps = {
  params: { category: string };
};

export default async function CategoryProductsIndexPage({
  params: { category },
}: CategoryProductsIndexPageProps) {
  redirect(`/categories/${category}/1`);
}
