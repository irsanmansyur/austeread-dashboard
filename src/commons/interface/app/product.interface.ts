export type ProductType = {
  id: string;
  name: string;
  creator: string;
  desc: string;
  detail: string;
  price: number;
  qty: number;
  size_chart: string | File;
  asset_digital: string | File;
  createdAt: string;
  choice: choice[];
  img: string[] | File[];
  type: "physic" | "digital" | "ticket";
  subcategory_id: string;
};

type choice = {
  name: string;
  stock: number;
  weight: number;
  price: number;
};
