export type Order = {
  _id: string;
  date: string;
  product: {
    id: string;
    cantToBuy: number;
  };
  seller: string;
}
