import { Component } from '@angular/core';
import { ProductReportItem } from 'src/app/models/reports-models';
import { ProductReportsService } from 'src/app/services/product-reports.service';

@Component({
  selector: 'app-product-reports',
  templateUrl: './product-reports.component.html',
  styleUrls: ['./product-reports.component.css']
})
export class ProductReportsComponent {
  reports: ProductReportItem[];

  constructor(private reportsService: ProductReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getProductReports().subscribe(
      response => this.reports = response.items
    );
  }

  deleteReport(id: number): void {
    this.reportsService.deleteProductReport(id).subscribe(() => {
      this.loadReports();
    });
  }
}
