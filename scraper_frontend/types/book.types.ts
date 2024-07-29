export type Book = {
  _id: string;
  title: string;
  image_url: string;
  price: string;
  rating: string;
  stock: string;
};

export type BookDetails = {
  title: string;
  price: string;
  rating: string;
  stock: string;
  image_url: string;
  description: string;
  tax: string;
  product_type: string;
  price_incl_tax: string;
  availability: string;
  num_reviews: string;
};
