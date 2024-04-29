export interface CommentsResponse  {
    id?: string;
    content: string;
    created: string;
    userName: string;
    repliedToUserName: string;
    likesCount: number;
    hasReplies: boolean;
}
