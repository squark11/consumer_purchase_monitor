import { CommentItem } from "./commentsItem";
import { Item } from "./item";


export interface ItemsResponse {
  items?: Item[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}

export interface CommentsResponse {
  items?: CommentItem[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}