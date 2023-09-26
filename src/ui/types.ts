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
  description: string;
  price: number;
  coverImage: {
    src: string;
    alt: string;
  };
};
