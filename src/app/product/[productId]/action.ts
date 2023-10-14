"use server";

import {
  AddReviewType,
  addReviewToProduct,
} from "@/api/reviews";
import { ReviewItemType } from "@/ui/types";
import { revalidatePath } from "next/cache";

export async function handleAddProductReview(
  productId: string,
  review: AddReviewType
) {
  addReviewToProduct({ ...review, productId });
}
