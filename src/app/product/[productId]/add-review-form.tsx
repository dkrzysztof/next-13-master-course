"use client"
import { Input } from "@/ui/atoms/Input";
import { Rating } from "@mui/material";

export type AddReviewFormProps = {
  action: any;
  productId: string;
};

export const AddReviewForm = ({
  action,
  productId,
}: AddReviewFormProps) => {
  return (
    <form data-testid="add-review-form">
      <Input
        name="productId"
        initialValue={productId}
        hidden
      />
      <Input
        name="headline"
        label="Review's title"
        initialValue="Test review's title"
      />
      <Input
        name="content"
        label="Review's description"
        initialValue="Test description"
      />
      <Input
        name="name"
        label="Your username"
        initialValue="test name"
      />
      <Input
        name="email"
        type="email"
        label="E-mail"
        initialValue="test@email.com"
      />
      <div>
        <label
          htmlFor="rating"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Rating
        </label>
        <Rating name="rating" />
      </div>
      <button
        className="py-2 px-6 rounded-lg border-4 border-white hover:bg-blue-400 active:border-blue-200 bg-blue-600 text-white transition-all"
        type="submit"
        formAction={action}
      >
        Save
      </button>
    </form>
  );
};
