import { Component, Input } from '@angular/core';
import { Comment, PaginatedComments } from 'src/app/models/comments.models';
import { Pagination } from 'src/app/models/pagination';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(private commentsService: CommentsService, private likesService: LikesService, private alert: AlertService
  ) {}

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
        this.alert.error(error);
      }
    );
  }

  postComment(productId: number, content: string) {
    this.commentsService.postComment(productId, content)
      .subscribe(
        response => {
          this.alert.success('Comment added');
          this.getComments(); 
        },
        error => {
          this.alert.error(error);
        }
      );
  }

  postReply(productId: number, commentId: number, content: string) {
    this.commentsService.postCommentReply(productId, commentId, content)
      .subscribe(
        response => {
          this.alert.success('Reply added');
          this.getComments(); 
          this.showMainCommentForm = true; 
        },
        error => {
          this.alert.error(error);
        }
      );
  }

  increasePageSize() {
    this.filter.PageSize += 5; 
    this.getComments(); 
  }

  toggleReplyForm(commentReply: Comment) {
    this.showReplyFormId = this.showReplyFormId === commentReply.id ? null : commentReply.id, null;
    this.replyContent = '@'+commentReply.userName+' ';
    this.showMainCommentForm = false; 
  }
}
