import React from "react";
import { getCategoriesList } from "@/api/categories";
import { CategoriesList } from "@/ui/organisms/CategoriesList";

export default async function CategoriesPage() {
  const categories = await getCategoriesList();
  return (
    <>
      <div className="text-slate-600">Categories</div>
      <CategoriesList categories={categories}/>
    </>
  );
}
