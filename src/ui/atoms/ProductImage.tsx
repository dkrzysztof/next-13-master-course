import NextImage from "next/image";

export type ProductCoverImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const ProductImage = ({
  src,
  alt,
  width,
  height,
}: ProductCoverImageProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
      <NextImage
        width={width || 640}
        height={height || 640}
        alt={alt}
        src={src}
        className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105 cursor-pointer"
      />
    </div>
  );
};
