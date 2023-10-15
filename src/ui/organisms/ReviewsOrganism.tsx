"use client";

import {
  // @ts-expect-error
  // eslint-disable-next-line
  experimental_useOptimistic as useOptimistic,
} from "react";
import {
  AddReviewType,
} from "@/api/reviews";
import { handleAddProductReview } from "@/app/product/[productId]/action";
import {
  AddReviewForm,
} from "@/app/product/[productId]/add-review-form";
import { ReviewList } from "./ReviewList";
import { ReviewItemType } from "../types";

export type ReviewsOrganismProps = {
  productId: string;
  reviews: ReviewItemType[];
};

export const ReviewsOrganism = ({
  productId,
  reviews,
}: ReviewsOrganismProps) => {
  const [optimisticReviews, setOptimisticReviews] =
    useOptimistic(
      reviews,
      //@ts-expect-error
      (_state, newReview: ReviewItemType) => [
        ..._state,
        newReview,
      ]
    );

  return (
    <>
      <div className="flex-auto w-1/3">
        <h2 className="text-bold text-2xl">Ratings</h2>
        <AddReviewForm
          action={async (formData: FormData) => {
            const newReview = formDataToReview(formData);
            setOptimisticReviews({
              ...newReview,
              id: optimisticReviews.length + 1,
            });
            await handleAddProductReview(
              productId,
              newReview
            );
          }}
          productId={productId}
        />
      </div>
      <div className="flex-auto w-2/3 text-black">
        <ReviewList reviews={optimisticReviews} />
      </div>
    </>
  );
}

function formDataToReview(
  formData: FormData
): AddReviewType {
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

  return {
    content,
    email,
    headline,
    name,
    productId,
    rating: +rating,
  };
}
