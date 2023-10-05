export type SearchParamHeaderProps = {
  searchParams: string;
};

export const SearchParamHeader = ({
  searchParams,
}: SearchParamHeaderProps) => {
  return (
    <div className="mb-4">
      <p className="text-md text-blue-600 font-light mb-0">
        SEARCHED PHRASE:
      </p>
      <h1 className="text-6xl text-slate-900 font-extrabold">
        {searchParams}
      </h1>
    </div>
  );
};
