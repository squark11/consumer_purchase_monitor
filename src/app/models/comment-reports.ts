import { CommentsResponse } from "./commentsItem";

export interface CommentReports{
    id:number;
    commentId:number;
    reason:string;
    status:string;
    created:string;
    commentInfo:CommentsResponse;
}