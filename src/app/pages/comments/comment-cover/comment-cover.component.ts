import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/models/comments.models';
import { LikesService } from 'src/app/services/likes.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReportComponent } from '../../reports/add-report/add-report.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-comment-cover',
  templateUrl: './comment-cover.component.html',
  styleUrls: ['./comment-cover.component.css']
})
export class CommentCoverComponent {
  @Input() comment: Comment;
  productId: number;
  @Output() likeClicked = new EventEmitter<number>();
  @Output() replyClicked = new EventEmitter<Comment>();
  
  constructor(private likesService: LikesService,
              private commentsService: CommentsService, 
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private router: Router,
              private alerts: AlertService) {}

  ngOnInit(): void {
    const currentPath = this.router.url;

    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id'); 
    });
  }
  
  like(commentId: number) {
    if (this.comment.hasUserLiked) {
      this.likesService.removeLikeFromComment(commentId).subscribe(
        response => {
          console.log('Like removed:', response);
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Error removing like:', error);
        }
      );
    } else {
      this.likesService.addLikeToComment(commentId).subscribe(
        response => {
          console.log('Like added:', response);
          this.alerts.success("You liked it");
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Error adding like:', error);
          this.alerts.error("Something went wrong");
        }
      );
    }
  }

  replyToComment(comment: Comment) {
    this.replyClicked.emit(comment); 
  }

  deleteComment(commentId: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      console.log(this.productId);
      this.commentsService.deleteComment(this.productId, commentId).subscribe(
        response => {
          console.log('Comment deleted:', response);
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Error deleting comment:', error);
        }
      );
    }
  }

  editComment(commentId: number) {
    const modalRef = this.modalService.open(CommentEditComponent);
    modalRef.componentInstance.productId = this.productId;
    modalRef.componentInstance.comment = this.comment;

    modalRef.result.then((result) => {
      if (result === 'Comment updated') {
        this.likeClicked.emit(commentId);
      }
    }, (reason) => {
    });
  }
}
