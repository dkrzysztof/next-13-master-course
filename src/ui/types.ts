export type ListPagination<T> = {
  data: T[];
  count: number;
};

export type ProductResponseItem = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
};

export type ProductItemType = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  coverImage?: {
    src: string;
    alt: string;
  };
  orderItem?:{
    id: string;
  }
};

export type CategoryItemType = {
  id: string;
  name: string;
  slug: string;
};

export type CollectionItemType = {
  id: string;
  description?: string | null;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  products?: ProductItemType[];
};

export type ProductVariant =
  | ProductColorVariant
  | ProductSizeColorVariant
  | ProductSizeVariant;

export interface ProductBaseVariant {
  id: string;
  name: string;
  __typename: string;
}

export interface ProductColorVariant
  extends ProductBaseVariant {
  __typename: "ProductColorVariant";
  color: string;
}
export interface ProductSizeColorVariant
  extends ProductBaseVariant {
  __typename: "ProductSizeColorVariant";
  color: string;
  size: string;
}
export interface ProductSizeVariant
  extends ProductBaseVariant {
  __typename: "ProductSizeVariant";
  size: string;
}


export interface ReviewItemType{
  id: string;
  headline: string;
  rating: number;
  content: string;
  name:string;
}