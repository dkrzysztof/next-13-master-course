// @ts-expect-error
// eslint-disable-next-line
import { experimental_useOptimistic as useOptimistic } from "react";
import { getProductReviews } from "@/api/reviews";
import { handleAddProductReview } from "@/app/product/[productId]/action";
import { AddReviewForm } from "@/app/product/[productId]/add-review-form";
import { ReviewList } from "./ReviewList";

export type ReviewsOrganismProps = {
  productId: string;
};

export async function ReviewsOrganism({
  productId,
}: ReviewsOrganismProps) {

  const reviews = await getProductReviews(productId);
  console.log(reviews.length);

  return (
    <>
      <div className="flex-auto w-1/3">
        <h1 className="text-bold text-2xl">Ratings</h1>
        <AddReviewForm
          action={handleAddProductReview}
          productId={productId}
        />
      </div>
      <div className="flex-auto w-2/3 text-black">
        <ReviewList reviews={reviews} />
      </div>
    </>
  );
}
