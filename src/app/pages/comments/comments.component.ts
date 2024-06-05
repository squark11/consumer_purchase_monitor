import { Component, Input } from '@angular/core';
import { Comment, PaginatedComments } from 'src/app/models/comments.models';
import { CommentsService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() id:number;
  content: string;
  comments:Comment[];
  showReplyFormId: number = null;
  replyContent: string;
  showMainCommentForm: boolean = true;

  constructor(private commentsService:CommentsService, private likesService:LikesService){}
  
  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.commentsService.getComments(this.id).subscribe(comments => this.comments=comments.items);
  }

  postComment(productId: number, content: string) {
    this.commentsService.postComment(productId, content)
      .subscribe(
        response => {
          console.log('Komentarz został dodany:', response);
          this.getComments();
        },
        error => {
          console.error('Wystąpił błąd podczas dodawania komentarza:', error);
        }
      );
  }

  toggleReplyForm(commentId: number) {
    this.showReplyFormId = this.showReplyFormId === commentId ? null : commentId;
    this.replyContent = '';
    this.showMainCommentForm = false; // Ustawiamy showMainCommentForm na false
  }

  postReply(productId: number, commentId: number, content: string) {
    this.commentsService.postCommentReply(productId, commentId, content)
      .subscribe(
        response => {
          console.log('Odpowiedź została dodana:', response);
          this.getComments();
          this.toggleReplyForm(commentId);
          this.showMainCommentForm = true; // Po dodaniu odpowiedzi, ustawiamy showMainCommentForm na true
        },
        error => {
          console.error('Wystąpił błąd podczas dodawania odpowiedzi:', error);
        }
      );
  }
}
