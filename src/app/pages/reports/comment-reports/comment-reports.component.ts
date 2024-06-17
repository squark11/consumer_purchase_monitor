import { Component } from '@angular/core';
import { CommentReportItem } from 'src/app/models/reports-models';
import { CommentReportsService } from 'src/app/services/comment-reports.service';

@Component({
  selector: 'app-comment-reports',
  templateUrl: './comment-reports.component.html',
  styleUrls: ['./comment-reports.component.css']
})
export class CommentReportsComponent {

  reports: CommentReportItem[];

  constructor(private reportsService: CommentReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(){
    this.reportsService.getCommentsReports().subscribe(
      response => this.reports = response.items
    )
  }

  deleteReport(commentId:number): void {
    this.reportsService.deleteCommentReport(commentId, 1).subscribe(() => {
      this.loadReports(); 
    });
  }
  
}
