import { Component } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { ReviewReportItem } from 'src/app/models/reports-models';
import { ReviewReportsService } from 'src/app/services/review-reports.service';

@Component({
  selector: 'app-review-reports',
  templateUrl: './review-reports.component.html',
  styleUrls: ['./review-reports.component.css']
})
export class ReviewReportsComponent {
  reports: ReviewReportItem[];

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
  
  constructor(private reportsService: ReviewReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getReviewReports(this.filter).subscribe(
      response => {
        this.reports = response.items
        this.pagination = response;
      }
    );
  }

  deleteReport(id: number): void {
    this.reportsService.deleteReviewReport(id).subscribe(() => {
      this.loadReports();
    });
  }
}
