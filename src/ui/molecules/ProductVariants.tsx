import { ProductVariantItem } from "../atoms/ProductVariantItem";
import type { ProductBaseVariant } from "../types";

type ProductVariantsProps = {
  variants: ProductBaseVariant[];
};

export const ProductVariants = ({
  variants,
}: ProductVariantsProps) => {
  if (!variants.length) {
    return <></>;
  }

  return (
    <div>
      <h6>Colors:</h6>
      <div>
        {variants.map((variant) => (
          <ProductVariantItem
            key={variant.id}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};
