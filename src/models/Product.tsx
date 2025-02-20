
export interface Producto {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  sku: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  discountPrice: string | number | null;
}