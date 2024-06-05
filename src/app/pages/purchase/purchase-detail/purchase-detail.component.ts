import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseDetails, PurchaseItem } from 'src/app/models/user-purchase.models';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent {
  purchaseDetails: PurchaseDetails;
  addItemForm: FormGroup;
  isBudgetExceeded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userPurchaseService: UserPurchaseService
  ) {
    this.addItemForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const purchaseId = this.route.snapshot.params['id'];
    this.userPurchaseService.getPurchaseDetails(purchaseId).subscribe(details => {
      this.purchaseDetails = details;
      this.checkBudget();
    });
  }

  addItem(): void {
    if (this.addItemForm.valid) {
      const purchaseId = this.purchaseDetails.id;
      const newItem: PurchaseItem = this.addItemForm.value;
      this.userPurchaseService.addItemToPurchase(purchaseId, newItem).subscribe(() => {
        this.purchaseDetails.items.push(newItem);
        this.purchaseDetails.totalAmount += newItem.price * newItem.quantity;
        this.checkBudget();
        this.addItemForm.reset();
      });
    }
  }

  removeItem(itemId: number): void {
    this.userPurchaseService.removeItemFromPurchase(itemId).subscribe(() => {
      const itemIndex = this.purchaseDetails.items.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        this.purchaseDetails.totalAmount -= this.purchaseDetails.items[itemIndex].price * this.purchaseDetails.items[itemIndex].quantity;
        this.purchaseDetails.items.splice(itemIndex, 1);
        this.checkBudget();
      }
    });
  }

  checkBudget(): void {
    this.userPurchaseService.getUserPurchases().subscribe(response => {
      this.isBudgetExceeded = this.purchaseDetails.totalAmount + response.currentMonthSpent > response.monthlyExpenseLimit;
    });
  }

  goBack(): void {
    this.router.navigate(['/purchases']);
  }
}
