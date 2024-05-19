import { Component, Input } from '@angular/core';
import { CommentItem } from 'src/app/models/commentsItem';
import { CommentsResponse } from 'src/app/models/response';
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
  comments:CommentItem[];
  
  liked:Boolean=false;

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
}
