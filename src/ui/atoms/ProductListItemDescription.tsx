import { formatMoney } from "@/utils";
import { Rating } from "@mui/material";

type ProductListItemDescriptionProps = {
  product: {
    name: string;
    category: string;
    price: number;
    rating: number | null;
  };
};

export const ProductListItemDescription = ({
  product: { category, name, price, rating = 0 },
}: ProductListItemDescriptionProps) => {
  return (
    <div className="mt-2 flex justify-between">
      <div>
        <h3 className="text-sm font-semibold text-gray-700">
          {name}
        </h3>
        <p className="text-sm text-gray-500">
          <span className="sr-only">Kategoria:</span>{" "}
          {category}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 text-right">
          <span className="sr-only">Cena:</span>
          {formatMoney(price)}
        </p>
        <p className="flex flex-nowrap text-sm font-medium text-gray-900 text-right align-middle">
          (
          {rating && rating > 0
            ? rating?.toFixed(1)
            : rating?.toFixed(0)}
          ) <Rating value={rating} readOnly size="small" />
        </p>
      </div>
    </div>
  );
};
