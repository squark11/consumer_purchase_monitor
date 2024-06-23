import { Component } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { ProductReportItem } from 'src/app/models/reports-models';
import { ProductReportsService } from 'src/app/services/product-reports.service';
import { AlertService } from 'src/app/services/alert.service'; 

@Component({
  selector: 'app-product-reports',
  templateUrl: './product-reports.component.html',
  styleUrls: ['./product-reports.component.css']
})
export class ProductReportsComponent {
  reports: ProductReportItem[];
  pagination: Pagination = {
    totalPages: null,
    itemsFrom: 1,
    itemsTo: 5,
    totalItemsCount: 0
  };
  filter: any = {
    PageNumber: this.pagination.itemsFrom,
    PageSize: this.pagination.itemsTo
  };

  constructor(
    private reportsService: ProductReportsService,
    private alertService: AlertService 
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getProductReports(this.filter).subscribe(
      response => {
        this.reports = response.items;
        this.pagination = response;
      },
      error => {
        this.alertService.error('Error loading product reports');
        console.error('Error loading product reports:', error);
      }
    );
  }

  deleteReport(id: number): void {
    this.reportsService.deleteProductReport(id).subscribe(
      () => {
        this.loadReports();
        this.alertService.success('Product report deleted successfully');
      },
      error => {
        this.alertService.error('Error deleting product report');
        console.error('Error deleting product report:', error);
      }
    );
  }
}
