import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPassword } from 'src/app/models/newPassword';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  password: NewPassword = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  errorMessage: string;
  successMessage: string;

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private alert: AlertService) { }

  save(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Form is invalid. Please fill out all fields correctly.';
      return;
    }

    if (this.password.newPassword !== this.password.confirmNewPassword) {
      this.errorMessage = 'New passwords do not match!';
      return;
    }

    this.userService.changePassword(this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Password changed successfully!';
        this.alert.success(this.successMessage);
        this.activeModal.close('save');
      },
      error: (error) => {
        this.errorMessage = 'Error changing password. Please try again.';
        this.alert.error(this.errorMessage);
      }
    });
  }
}
