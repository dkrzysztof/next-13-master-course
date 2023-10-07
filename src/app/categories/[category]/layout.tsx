import { PageHeader } from "@/ui/atoms/PageHeader";

const TITLES: Record<string, string> = {
  "t-shirts": "T-Shirts",
  hoodies: "Hoodies",
  accessories: "Accessories",
};

export default async function CategoriesLayout({
  children,
  params: { category },
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  const title = TITLES[category] || "Unnamed Category";

  return (
    <section className="mx-auto max-w-2xl px-8 py-4 sm:px-6 sm:py-4 md:max-w-4xl lg:max-w-7xl">
      <PageHeader title={title} name="Category" />
      {children}
    </section>
  );
}
