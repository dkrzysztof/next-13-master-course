"use server";

import {
  AddReviewType,
  addReviewToProduct,
} from "@/api/reviews";

export async function handleAddProductReview(
  productId: string,
  review: AddReviewType
) {
  addReviewToProduct({ ...review, productId });
}
