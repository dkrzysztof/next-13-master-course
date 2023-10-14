import { ReviewListItem } from "../molecules/ReviewListItem";
import { ReviewItemType } from "../types";

export type ReviewListProps = {
  reviews: ReviewItemType[];
};

export const ReviewList = ({
  reviews,
}: ReviewListProps) => {
  return (
    <>
      <h1 className="text-lg text-slate-900 font-bold mb-6">Customers reviews</h1>
      {reviews.map((review) => (
        <div className="mb-2 pb-2 border-b-1 border-slate-400">
          <ReviewListItem key={review.id} review={review} />
        </div>
      ))}
    </>
  );
};
