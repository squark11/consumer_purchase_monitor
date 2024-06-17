export interface ProductItem {
    id?: number;
    name: string;
    description:string;
    price: string;
    category: string;
    averageRating?: number;
}

export interface ProductResponse {
    items?: ProductItem[];
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
  }

export interface FiltersProduct{
    SearchPhrase:string;
    PageNumber:number;
    PageSize:number;
    SortBy?:number;
}