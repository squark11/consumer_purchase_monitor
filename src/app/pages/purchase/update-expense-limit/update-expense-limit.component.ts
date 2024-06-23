import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-update-expense-limit',
  templateUrl: './update-expense-limit.component.html',
  styleUrls: ['./update-expense-limit.component.css']
})
export class UpdateExpenseLimitComponent {
  updateExpenseLimitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPurchaseService: UserPurchaseService,
    private alertService: AlertService
  ) {
    this.updateExpenseLimitForm = this.fb.group({
      newLimit: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.updateExpenseLimitForm.valid) {
      this.userPurchaseService.updateExpenseLimit(this.updateExpenseLimitForm.value).subscribe(() => {
        this.alertService.success('Expense limit updated successfully');
        this.router.navigate(['/purchases']);
      }, error => {
        this.alertService.error('Error updating expense limit');
        console.error('Error updating expense limit:', error);
      });
    } else {
      this.alertService.error('Please fill in the new limit');
    }
  }

  cancel(): void {
    this.router.navigate(['/purchases']);
  }
}
