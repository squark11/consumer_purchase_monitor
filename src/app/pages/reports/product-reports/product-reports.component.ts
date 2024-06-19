import { Component } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
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

  pagination: Pagination = {
    totalPages: null,
    itemsFrom: 1,
    itemsTo: 5,
    totalItemsCount: 0
  };

  filter:any = {
    PageNumber: this.pagination.itemsFrom,
    PageSize: this.pagination.itemsTo
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getProductReports(this.filter).subscribe(
      response => {
        this.reports = response.items
        this.pagination = response;
      }
    );
  }

  deleteReport(id: number): void {
    this.reportsService.deleteProductReport(id).subscribe(() => {
      this.loadReports();
    });
  }
}
