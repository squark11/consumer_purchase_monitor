import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/models/comments.models';
import { LikesService } from 'src/app/services/likes.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReportComponent } from '../../reports/add-report/add-report.component';
import { CommentEditComponent } from '../comment-edit/comment-edit.component';

@Component({
  selector: 'app-comment-cover',
  templateUrl: './comment-cover.component.html',
  styleUrls: ['./comment-cover.component.css']
})
export class CommentCoverComponent {
  @Input() comment: Comment;
  productId: number;
  @Output() likeClicked = new EventEmitter<number>();
  @Output() replyClicked = new EventEmitter<number>();
  
  constructor(private likesService: LikesService,
     private commentsService: CommentsService, 
     private route: ActivatedRoute,
     private modalService: NgbModal
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id'); 
    });
    
  }
  
  like(commentId: number) {
    if (this.comment.hasUserLiked) {
      this.likesService.removeLikeFromComment(commentId).subscribe(
        response => {
          console.log('Polubienie usunięte:', response);
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Błąd podczas usuwania polubienia:', error);
        }
      );
    } else {
      this.likesService.addLikeToComment(commentId).subscribe(
        response => {
          console.log('Polubienie dodane:', response);
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Błąd podczas dodawania polubienia: ', error);
        }
      );
    }
  }

  replyToComment(commentId: number) {
    this.replyClicked.emit(commentId); 
  }

  deleteComment(commentId: number) {
    if (confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
      console.log(this.productId);
      this.commentsService.deleteComment(this.productId, commentId).subscribe(
        response => {
          console.log('Komentarz usunięty:', response);
          this.likeClicked.emit(commentId);
        },
        error => {
          console.error('Błąd podczas usuwania komentarza:', error);
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
