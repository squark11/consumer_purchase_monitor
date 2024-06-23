import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination';
import { Purchase, UserPurchasesResponse } from 'src/app/models/user-purchase.models';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent {
  purchases: UserPurchasesResponse['purchases'];
  updateLimitForm: FormGroup;

  pagination: UserPurchasesResponse = {
    totalPages: null,
    itemsFrom: 1,
    itemsTo: 5,
    totalItemsCount: null
  };

  filter: any = {
    PageNumber: this.pagination.itemsFrom,
    PageSize: this.pagination.itemsTo,
    SortDirection: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPurchaseService: UserPurchaseService,
    private alertService: AlertService
  ) {
    this.updateLimitForm = this.fb.group({
      expenseLimit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.userPurchaseService.getUserPurchases(this.filter).subscribe(response => {
      this.purchases = response.purchases;
      this.pagination = response;
      this.updateLimitForm.patchValue({
        expenseLimit: response.monthlyExpenseLimit
      });
    }, error => {
      this.alertService.error('Error loading purchases');
      console.error('Error loading purchases:', error);
    });
  }

  removePurchase(purchaseId: number): void {
    this.userPurchaseService.removePurchase(purchaseId).subscribe(() => {
      this.alertService.success('Purchase removed successfully');
      this.loadPurchases();
    }, error => {
      this.alertService.error('Error removing purchase');
      console.error('Error removing purchase:', error);
    });
  }

  updateLimit(): void {
    if (this.updateLimitForm.valid) {
      const newLimit = this.updateLimitForm.value.expenseLimit;
      this.userPurchaseService.updateExpenseLimit(newLimit).subscribe(() => {
        this.alertService.success('Expense limit updated successfully');
        this.loadPurchases();
      }, error => {
        this.alertService.error('Error updating expense limit');
        console.error('Error updating expense limit:', error);
      });
    } else {
      this.alertService.error('Please fill in the expense limit');
    }
  }
}
