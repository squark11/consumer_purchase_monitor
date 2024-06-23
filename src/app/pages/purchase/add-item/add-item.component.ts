import { Component, EventEmitter, Output } from '@angular/core';
import { PurchaseItem } from 'src/app/models/user-purchase.models';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  @Output() itemAdded = new EventEmitter<PurchaseItem>();
  item: PurchaseItem = { id: 0, productName: '', price: 0, quantity: 0 };

  constructor(private alertService: AlertService) {}

  addItem(): void {
    if (this.item.productName && this.item.price > 0 && this.item.quantity > 0) {
      this.itemAdded.emit(this.item);
      this.alertService.success('Item added successfully');
      this.item = { id: 0, productName: '', price: 0, quantity: 0 };
    } else {
      this.alertService.error('Please fill in all fields correctly');
    }
  }
}
