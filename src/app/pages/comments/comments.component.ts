import { Component, Input } from '@angular/core';
import { CommentsResponse } from 'src/app/models/commentsResponse';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() id:number;
  comments:CommentsResponse[];
  constructor(private commentsService:CommentsService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getComments(){
    this.commentsService.getComments(this.id).subscribe(comments => this.comments=comments);
  }
}
