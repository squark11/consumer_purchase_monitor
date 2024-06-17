import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentReportsService } from 'src/app/services/comment-reports.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {
  @Input() productId: number;
  @Input() commentId: number;

  reportReason: string = '';

  constructor(private modalService: NgbModal, 
    private CommentReport:CommentReportsService
  
  ) {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  submitReport() {
    if (this.reportReason.trim() !== '') {
      this.CommentReport.postCommentReports(this.productId, this.commentId, this.reportReason).subscribe(
        response => {
          console.log('Report submitted:', response);
          this.closeModal();
        },
        error => {
          console.error('Error submitting report:', error);
        }
      );
    } else {
    }
  }

}
