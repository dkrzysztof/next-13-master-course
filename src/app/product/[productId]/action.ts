"use server";

import { recalculateProductAverageReview } from "@/api/products";
import {
  AddReviewType,
  addReviewToProduct,
} from "@/api/reviews";

export async function handleAddProductReview(
  productId: string,
  review: AddReviewType
) { 
  "use server";
  await addReviewToProduct({ ...review, productId });
  await recalculateProductAverageReview(
    productId
  );
}
