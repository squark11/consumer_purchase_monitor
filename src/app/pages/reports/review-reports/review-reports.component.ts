import { Component } from '@angular/core';
import { ReviewReportItem } from 'src/app/models/reports-models';
import { ReviewReportsService } from 'src/app/services/review-reports.service';

@Component({
  selector: 'app-review-reports',
  templateUrl: './review-reports.component.html',
  styleUrls: ['./review-reports.component.css']
})
export class ReviewReportsComponent {
  reports: ReviewReportItem[];

  constructor(private reportsService: ReviewReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getReviewReports().subscribe(
      response => this.reports = response.items
    );
  }

  deleteReport(id: number): void {
    this.reportsService.deleteReviewReport(id).subscribe(() => {
      this.loadReports();
    });
  }
}
