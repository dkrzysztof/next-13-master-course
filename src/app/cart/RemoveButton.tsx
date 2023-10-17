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
    <form>
      <button
        className="text-red-500"
        disabled={isPending}
        formAction={() => {
          startTransistion(async () => {
            await removeItem(itemId);
            router.refresh();
          });
        }}
      >
        Remove
      </button>
    </form>
  );
};
