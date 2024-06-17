import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent {

  reportId: number;
  reportType: string;
  newStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private httpClient: HttpClient,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportId = +params['id'];
      this.reportType = params['type'];
    });
  }

  updateReportStatus(): void {
    if (!this.newStatus) {
      console.error('New status is required');
      return;
    }

    let apiUrl = '';
    switch(this.reportType) {
      case 'comment':
        apiUrl = `https://localhost:44324/api/comment-reports/${this.reportId}/status`;
        break;
      case 'product':
        apiUrl = `https://localhost:44324/api/product-reports/requests/${this.reportId}/status`;
        break;
      case 'review':
        apiUrl = `https://localhost:44324/api/review-reports/${this.reportId}/status`;
        break;
      default:
        console.error('Invalid report type');
        return;
    }

    this.httpClient.put<any>(apiUrl, { newStatus: this.newStatus}, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    }).subscribe(
      response => {
        console.log('Report status updated:', response);
        this.router.navigate(['/reports']);
      },
      error => {
        console.error('Error updating report status:', error);
      }
    );
  }
}
