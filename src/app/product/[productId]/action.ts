"use server";

import {
  AddReviewType,
  addReviewToProduct,
} from "@/api/reviews";
import { revalidatePath } from "next/cache";

export async function handleAddProductReview(
  formData: FormData
) {
  const {
    content,
    email,
    headline,
    name,
    productId,
    rating,
  } = Object.fromEntries(
    formData
  ) as unknown as AddReviewType;

  addReviewToProduct({
    content,
    email,
    headline,
    name,
    productId,
    rating: +rating,
  });
  revalidatePath(`/product/${productId}`);
}
