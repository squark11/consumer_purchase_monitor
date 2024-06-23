import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  email: string;
  user: any;
  errorMessage: string;
  successMessage: string;

  constructor(private adminService: AdminService, private alert: AlertService) {}

  getUserByEmail() {
    this.adminService.getUserByEmail(this.email).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        this.errorMessage = 'Error finding user. Please try again.';
        this.alert.error(this.errorMessage);
      }
    });
  }

  grantAdmin() {
    this.adminService.postAdmin(this.user.id).subscribe({
      next: (response) => {
        this.successMessage = 'Admin rights granted successfully!';
        this.alert.success(this.successMessage);
      },
      error: (error) => {
        this.errorMessage = 'Failed to grant admin rights. Please try again later.';
        this.alert.success(this.successMessage);
      }
    });
  }
}
