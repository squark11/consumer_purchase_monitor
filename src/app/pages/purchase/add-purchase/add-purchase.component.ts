import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPurchaseService } from 'src/app/services/user-purchase.service';
import { AlertService } from 'src/app/services/alert.service';

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
    private userPurchaseService: UserPurchaseService,
    private alertService: AlertService
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
        this.alertService.success('Purchase added successfully');
        this.router.navigate(['/purchases']);
      }, error => {
        this.alertService.error('Error adding purchase');
        console.error('Error adding purchase:', error);
      });
    } else {
      this.alertService.error('Please fill in all required fields');
    }
  }

  cancel(): void {
    this.router.navigate(['/purchases']);
  }
}
