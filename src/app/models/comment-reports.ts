import { Comment } from "./comments.models";

export interface CommentReports{
    id:number;
    commentId:number;
    reason:string;
    status:string;
    created:string;
    commentInfo:Comment;
}