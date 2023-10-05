import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Loader2
      aria-busy="true"
      style={{ animation: "spin 1s linear infinite" }}
    />
  );
}
