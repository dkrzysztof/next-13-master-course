import { formatMoney } from "@/utils";
import React from "react";
import { ProductItemType } from "../types";

type ProductDescriptionProps = {
  product: ProductItemType;
};

const ProductDescription = ({
  product: { name, category, description, price },
}: ProductDescriptionProps) => {
  return (
    <>
      <p className="text-sm tracking-widest text-gray-500">
        <span className="sr-only">Kategoria:</span> {category.toUpperCase()}
      </p>
      <h1 className="text-3xl text-slate-900 font-bold">{name}</h1>
      <p className="text-slate-900">{description}</p>
      <p className="text-xl mt-3 font-medium text-gray-900">
        <span className="sr-only">Kategoria:</span>
        {formatMoney(price)}
      </p>
    </>
  );
};

export default ProductDescription;
