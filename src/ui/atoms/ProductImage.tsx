export type ProductCoverImageProps = {
  src: string;
  alt: string;
};

export const ProductImage = ({ src, alt }: ProductCoverImageProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
      <img
        width={640}
        height={640}
        alt={alt}
        src={src}
        className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105 cursor-pointer"
      />
    </div>
  );
};
