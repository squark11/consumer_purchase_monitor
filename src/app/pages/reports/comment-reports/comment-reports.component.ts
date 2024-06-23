import { Component } from '@angular/core';
import { CommentReportItem } from 'src/app/models/reports-models';
import { Pagination } from 'src/app/models/pagination';
import { CommentReportsService } from 'src/app/services/comment-reports.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-comment-reports',
  templateUrl: './comment-reports.component.html',
  styleUrls: ['./comment-reports.component.css']
})
export class CommentReportsComponent {

  reports: CommentReportItem[];

  pagination: Pagination = {
    totalPages: null,
    itemsFrom: null,
    itemsTo: null,
    totalItemsCount: null
  };

  filter:any = {
    PageNumber: 1,
    PageSize: 5
  }
  
  constructor(
    private reportsService: CommentReportsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(){
    this.reportsService.getCommentsReports(this.filter).subscribe(
      response => {
        this.reports = response.items
        this.pagination = response;
      },
      error => {
        this.alertService.error('Error loading comment reports');
        console.error('Error loading comment reports:', error);
      }
    );
  }

  deleteReport(commentId:number): void {
    this.reportsService.deleteCommentReport(commentId, 1).subscribe(() => {
      this.loadReports();
      this.alertService.success('Comment report deleted successfully');
    }, error => {
      this.alertService.error('Error deleting comment report');
      console.error('Error deleting comment report:', error);
    });
  }
  
}
