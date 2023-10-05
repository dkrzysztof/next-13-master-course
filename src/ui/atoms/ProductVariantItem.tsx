import clsx from "clsx";
import type { ProductBaseVariant } from "../types";

type ProductVariantItemProps = {
  variant: ProductBaseVariant;
};

export const ProductVariantItem = ({
  variant: { name },
}: ProductVariantItemProps) => {
  return (
    <div
      // onClick={() => onClick(id)}
      className={clsx("border-md border-gray-400")}
    >
      {name}
    </div>
  );
};
