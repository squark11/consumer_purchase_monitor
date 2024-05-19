export interface CommentItem {
    id: number;
    content: string;
    created: string; 
    userName: string;
    repliedToUserName?: string;
    likesCount: number;
    hasReplies?: boolean;
  }