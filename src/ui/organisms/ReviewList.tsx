import clsx from "clsx";
import { ReviewListItem } from "../molecules/ReviewListItem";
import { ReviewItemType } from "../types";

export type ReviewListProps = {
  reviews: ReviewItemType[];
};

export const ReviewList = ({
  reviews,
}: ReviewListProps) => {
  const isLastItem = (index: number) =>
    index === reviews.length - 1;

  return (
    <>
      <h1 className="text-lg text-slate-900 font-bold mb-6">
        Customers reviews
      </h1>
      {reviews.map((review, index) => (
        <div
          key={index}
          className={clsx(
            "mb-2 pb-2",
            isLastItem(index) || "border-b border-slate-300"
          )}
        >
          <ReviewListItem review={review} />
        </div>
      ))}
    </>
  );
};
