export type PageHeaderProps = {
  title: string;
  name: string;
};

export const PageHeader = ({
  title,name
}: PageHeaderProps) => {
  return (
    <div className="mb-4">
      <p className="text-md text-blue-600 font-light mb-0">
        {name}
      </p>
      <h1 className="text-6xl text-slate-900 font-extrabold">
        {title}
      </h1>
    </div>
  );
};
