import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from 'src/app/models/comments.models';
import { AlertService } from 'src/app/services/alert.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent {
  @Input() comment: Comment
  @Input() productId: number;

  editContent: string;

  constructor(
    public activeModal: NgbActiveModal, 
    private commentsService: CommentsService,
    private alerts:AlertService
  ) { }

 ngOnInit(): void {
  this.editContent = this.comment.content;
  
 }

  saveComment() {
    this.commentsService.updateComment(this.productId, this.comment.id, this.editContent).subscribe(response => {
      this.activeModal.close('Comment updated');
      this.alerts.success("Comment updated")
    }, error => {
      console.error('Error updating comment:', error);
      this.alerts.error('Error updating comment');
    });
  }
}
