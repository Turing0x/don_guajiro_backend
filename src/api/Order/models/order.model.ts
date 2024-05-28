import { Product } from "../../Product/models/product.model"
import { User } from "../../Users/interface/user.interface";

export type Order = {
  _id: string;
  date: string;
  product_list: Product[];
  total_amount: number;
  seller: User;
}
