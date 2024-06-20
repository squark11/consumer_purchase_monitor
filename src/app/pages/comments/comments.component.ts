import { Component, Input } from '@angular/core';
import { Comment, PaginatedComments } from 'src/app/models/comments.models';
import { Pagination } from 'src/app/models/pagination';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() id: number;
  content: string;
  comments: Comment[] = []; 
  showReplyFormId: number = null;
  replyContent: string;
  showMainCommentForm: boolean = true;

  pagination: Pagination = {
    totalPages: null,
    itemsFrom: 1,
    itemsTo: 5,
    totalItemsCount: null
  };

  filter: any = {
    PageNumber: this.pagination.itemsFrom,
    PageSize: this.pagination.itemsTo,
    SortBy: 'newest'
  };

  constructor(private commentsService: CommentsService, private likesService: LikesService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsService.getComments(this.id, this.filter).subscribe(
      comments => {
        this.comments = comments.items; 
        this.pagination = comments; 
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  postComment(productId: number, content: string) {
    this.commentsService.postComment(productId, content)
      .subscribe(
        response => {
          console.log('Comment added:', response);
          this.getComments(); 
        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
  }

  postReply(productId: number, commentId: number, content: string) {
    this.commentsService.postCommentReply(productId, commentId, content)
      .subscribe(
        response => {
          console.log('Reply added:', response);
          this.getComments(); 
          this.toggleReplyForm(commentId);
          this.showMainCommentForm = true; 
        },
        error => {
          console.error('Error adding reply:', error);
        }
      );
  }

  increasePageSize() {
    this.filter.PageSize += 5; 
    this.getComments(); 
  }

  toggleReplyForm(commentId: number) {
    this.showReplyFormId = this.showReplyFormId === commentId ? null : commentId;
    this.replyContent = '';
    this.showMainCommentForm = false; 
  }
}
