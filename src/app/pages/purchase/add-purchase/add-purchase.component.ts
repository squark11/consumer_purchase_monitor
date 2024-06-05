import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseItem } from 'src/app/models/user-purchase.models';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent {
   addPurchaseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPurchaseService: UserPurchaseService
  ) {
    this.addPurchaseForm = this.fb.group({
      purchaseName: ['', Validators.required],
      purchaseItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addItem();
  }

  get purchaseItems(): FormArray {
    return this.addPurchaseForm.get('purchaseItems') as FormArray;
  }

  addItem(): void {
    this.purchaseItems.push(this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    }));
  }

  removeItem(index: number): void {
    this.purchaseItems.removeAt(index);
  }

  onSubmit(): void {
    if (this.addPurchaseForm.valid) {
      this.userPurchaseService.addPurchase(this.addPurchaseForm.value).subscribe(() => {
        this.router.navigate(['/purchases']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/purchases']);
  }
}
