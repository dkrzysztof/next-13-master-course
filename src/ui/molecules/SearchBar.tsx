"use client";
import { Search } from "lucide-react";
import { debounce } from "lodash";

type InputEvent = (event: string) => void;

export type SearchBarProps = {
  className?: string;
  onSearch:((value: string) => Promise<void>);
};

export const SearchBar = ({
  className,
  onSearch,
}: SearchBarProps) => {
  const inputDebounced = debounce<InputEvent>(
    (value) => onSearch(value),
    500
  );

  return (
    <div className={className}>
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-slate-600" size={20} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
          placeholder="Search T-shirts, Hoodies..."
          required
          onInput={(event) =>
            inputDebounced(event.currentTarget.value)
          }
        />
      </div>
    </div>
  );
};
