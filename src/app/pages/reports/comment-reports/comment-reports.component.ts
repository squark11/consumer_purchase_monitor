import { Component } from '@angular/core';
import { CommentReports } from 'src/app/models/comment-reports';
import { Pagination } from 'src/app/models/pagination';
import { CommentReportItem } from 'src/app/models/reports-models';
import { CommentReportsService } from 'src/app/services/comment-reports.service';

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
    PageNumber: this.pagination.itemsFrom | 1,
    PageSize: this.pagination.itemsTo | 5
  }
  
  constructor(private reportsService: CommentReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(){
    this.reportsService.getCommentsReports(this.filter).subscribe(
      response => {
        this.reports = response.items
        this.pagination = response;
      }
      
    )
  }

  deleteReport(commentId:number): void {
    this.reportsService.deleteCommentReport(commentId, 1).subscribe(() => {
      this.loadReports(); 
    });
  }
  
}
