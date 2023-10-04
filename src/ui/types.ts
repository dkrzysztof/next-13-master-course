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
  updatedAt: unknown;
  image: {
    url: string;
  };
};
