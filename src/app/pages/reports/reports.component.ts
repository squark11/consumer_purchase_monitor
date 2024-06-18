import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  activeTab: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['reports/comment-reports']);
  }
}
