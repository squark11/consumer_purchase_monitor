import { Item } from "./item";

export interface ItemsResponse {
  items?: Item[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}


