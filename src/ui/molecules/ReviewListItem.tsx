import { Rating } from "@mui/material";
import { ReviewItemType } from "../types";

export type ReviewListItemProps = {
  review: ReviewItemType;
};

export const ReviewListItem = ({
  review: { content, headline, name, rating },
}: ReviewListItemProps) => {
  return (
    <div className="py-1">
      <div className="flex flex-row gap-4">
        <p className="text-slate-600 text-base">{name},</p>
        {rating}/5 <Rating value={+rating} readOnly />
      </div>
      <h1 className="font-semibold text-xl mb-2">{headline}</h1>
      <p className="text-gray-700 italic">{content}</p>
    </div>
  );
};
