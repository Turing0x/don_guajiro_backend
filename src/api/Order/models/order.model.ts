import { Product } from "../../Product/models/product.model"

export type Order = {
  _id: string;
  date: boolean;
  product_list: Product[];
  total_amount: string;
  seller: string;
}
