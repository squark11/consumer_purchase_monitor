import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentReportsService } from 'src/app/services/comment-reports.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ProductReportsService } from 'src/app/services/product-reports.service';
import { ReviewReportsService } from 'src/app/services/review-reports.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {
  @Input() productId: number;
  @Input() commentId: number;
  @Input() reviewId: number;
  @Input() reportType: 'comment' | 'product' | 'review';

  reportReason: string = '';

  constructor(
    private modalService: NgbModal,
    private commentReportService: CommentReportsService,
    private productReportService: ProductReportsService,
    private reviewReportService: ReviewReportsService,
    private alertService: AlertService
  ) {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  submitReport() {
    if (this.reportReason.trim() !== '') {
      if (this.reportType === 'comment' && this.commentId) {
        this.commentReportService.postCommentReports(this.productId, this.commentId, this.reportReason).subscribe(
          response => {
            this.alertService.success('Comment report submitted successfully');
            this.closeModal();
          },
          error => {
            this.alertService.error('Error submitting comment report');
            console.error('Error submitting comment report:', error);
          }
        );
      } else if (this.reportType === 'product' && this.productId) {
        this.productReportService.PostProductReport(this.productId, this.reportReason).subscribe(
          response => {
            this.alertService.success('Product report submitted successfully');
            this.closeModal();
          },
          error => {
            this.alertService.error('Error submitting product report');
            console.error('Error submitting product report:', error);
          }
        );
      } else if (this.reportType === 'review' && this.reviewId) {
        this.reviewReportService.reportReview(this.reviewId, this.reportReason).subscribe(
          response => {
            this.alertService.success('Review report submitted successfully');
            this.closeModal();
          },
          error => {
            this.alertService.error('Error submitting review report');
            console.error('Error submitting review report:', error);
          }
        );
      }
    } else {
      this.alertService.error('Please provide a description.');
    }
  }
}
