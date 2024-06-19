import { Comment } from "./comments.models";
import { ProductItem } from "./product-models";
import { reviewItem } from "./review.models";


export interface ProductReportItem {
  id?: number;
  type: string;
  status: string;
  createdAt: string;
  reason: string;
  productInfo: ProductItem;
}

export interface ReviewReportItem {
  id?: number;
  type: string;
  status: string;
  createdAt: string;
  reason: string;
  reviewInfo: reviewItem;
}

export interface CommentReportItem {
  id?: number;
  commentId:number;
  reason: string;
  status:string;
  createdAt:string;
  commentInfo: Comment;
}

export interface ReportProductResponse {
  items: ProductReportItem[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}

export interface ReportCommentResponse {
  items: CommentReportItem[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}

export interface ReportReviewResponse {
  items: ReviewReportItem[];
  totalPages: number;
  itemsFrom: number;
  itemsTo: number;
  totalItemsCount: number;
}
