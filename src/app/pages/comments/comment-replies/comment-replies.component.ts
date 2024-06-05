import { Component, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comments.models';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.css']
})
export class CommentRepliesComponent {
  @Input() parentid:number;
  comments:Comment[];
  productId:number;
  constructor(private commentsService:CommentsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getComments();
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
    });
  }

  getComments(){
    this.commentsService.getCommentReplies(this.productId, this.parentid).subscribe(comments => this.comments=comments.items);
  }
}
