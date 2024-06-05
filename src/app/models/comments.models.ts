export interface Comment {
    id: number;
    content: string;
    created: string; 
    userName: string;
    repliedToUserName?: string | null;
    likesCount: number;
    hasReplies: boolean;
    hasUserLiked: boolean;
    hasUserWritten: boolean;
    replies?: Comment[];
  }
  
  export interface PaginatedComments {
    items: Comment[];
    totalPages: number;
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
  }
  
  export interface CommentReports{
    id:number;
    commentId:number;
    reason:string;
    status:string;
    created:string;
    commentInfo:Comment;
}