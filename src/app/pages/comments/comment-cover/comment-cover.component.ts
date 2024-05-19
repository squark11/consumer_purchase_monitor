import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentItem } from 'src/app/models/commentsItem';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-comment-cover',
  templateUrl: './comment-cover.component.html',
  styleUrls: ['./comment-cover.component.css']
})
export class CommentCoverComponent {
  @Input() comment: CommentItem;
  @Output() likeClicked = new EventEmitter<number>();
  
  liked:Boolean;

  constructor(private likesService:LikesService){}
  
  like(commentId: number) {
    this.likesService.addLikeToComment(commentId).subscribe(
      response => {
        console.log('Polubienie dodane:', response);
        console.log(this.liked);
        this.likeClicked.emit(commentId);
        this.liked = true;
      },
      error => {
        console.error('Błąd podczas dodawania polubienia: '+this.liked, error);
        this.likesService.removeLikeFromComment(commentId).subscribe(
          response => {
            console.log('Polubienie usunięte:', response);
            console.log(this.liked);
            this.likeClicked.emit(commentId);
            this.liked = false;
          },
          error => {
            console.error('Błąd podczas usuwania polubienia:'+this.liked, error);
            // Tutaj możesz dodać kod obsługi błędu
          }
        );
      }
    );
  }
}
