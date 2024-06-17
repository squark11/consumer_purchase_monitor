import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Purchase, UserPurchasesResponse } from 'src/app/models/user-purchase.models';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent {
  purchases: UserPurchasesResponse['purchases'];
  updateLimitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPurchaseService: UserPurchaseService
  ) {
    this.updateLimitForm = this.fb.group({
      expenseLimit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.userPurchaseService.getUserPurchases().subscribe(response => {
      this.purchases = response.purchases;
      this.updateLimitForm.patchValue({
        expenseLimit: response.monthlyExpenseLimit
      });
    });
  }

  removePurchase(purchaseId: number): void {
    this.userPurchaseService.removePurchase(purchaseId).subscribe(() => {
      this.purchases = this.purchases.filter(purchase => purchase.id !== purchaseId);
    });
  }

  updateLimit(): void {
    if (this.updateLimitForm.valid) {
      const newLimit = this.updateLimitForm.value.expenseLimit;
      this.userPurchaseService.updateExpenseLimit(newLimit).subscribe(() => {
        this.loadPurchases();
      });
    }
  }
}