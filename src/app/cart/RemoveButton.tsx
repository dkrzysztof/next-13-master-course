"use client";

import { useTransition } from "react";
import { removeItem } from "./actions";
import { useRouter } from "next/navigation";

type RemoveButtonProps = {
  itemId: string;
};

export const RemoveButton = ({
  itemId,
}: RemoveButtonProps) => {
  const [isPending, startTransistion] = useTransition();
  const router = useRouter();

  return (
    <button
      className="text-red-500"
      disabled={isPending}
      formAction={() => {
        startTransistion(async () => {
          console.log("remove");
          await removeItem(itemId);
          router.refresh();
        });
      }}
    >
      Remove
    </button>
  );
};
