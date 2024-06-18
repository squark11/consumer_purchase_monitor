import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/models/comments.models';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent {
  @Input() comment: Comment
  @Input() productId: number;

  constructor(public activeModal: NgbActiveModal, private commentsService: CommentsService) { }


  saveComment() {
    this.commentsService.updateComment(this.productId, this.comment.id, this.comment.content).subscribe(response => {
      this.activeModal.close('Comment updated');
    }, error => {
      console.error('Error updating comment:', error);
    });
  }
}
