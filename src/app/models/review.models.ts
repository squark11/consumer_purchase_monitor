export interface reviewItem {
    id: number;
    comment: string;
    rating: number;
    userName: string;
    created: string;
    hasUserCreated:boolean;
}

export interface reviewItemsResponse {
    items?: reviewItem[];
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
  }