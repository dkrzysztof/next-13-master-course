import { Rating } from "@mui/material";
import { ReviewItemType } from "../types";

export type ReviewListItemProps = {
  review: ReviewItemType;
};

export const ReviewListItem = ({
  review: { content, headline, name, rating },
}: ReviewListItemProps) => {
  return (
    <div>
      <p className="text-black text-lg">{name}</p>
      <Rating value={+rating} readOnly/>
      <h1 className="text-bold text-lg">{headline}</h1>
      <p className="italic">{content}</p>
    </div>
  );
};
