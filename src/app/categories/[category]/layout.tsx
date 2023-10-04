export default function CategoriesLayout({
  children,
  params: { category },
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  return (
    <> 
      <h1 className="text-slate-600">Category: {category}</h1>
      {children}
    </>
  );
}
