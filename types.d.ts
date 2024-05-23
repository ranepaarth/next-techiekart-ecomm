type CartProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
