export interface PurchaseItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
  }
  
  export interface Purchase {
    id: number;
    purchaseDate: string;
    purchaseName: string;
    totalSpent: number;
  }
  
  export interface UserPurchasesResponse {
    totalSpentOnAllPurchases: number;
    monthlyExpenseLimit: number;
    monthlyRemaining: number;
    currentMonthSpent: number;
    purchases: Purchase[];
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
  }
  
  export interface PurchaseDetails {
    id: number;
    purchaseDate: string;
    totalAmount: number;
    purchaseName: string;
    items: PurchaseItem[];
  }
  