import { Component, EventEmitter, Output } from '@angular/core';
import { PurchaseItem } from 'src/app/models/user-purchase.models';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  @Output() itemAdded = new EventEmitter<PurchaseItem>();
  item: PurchaseItem = { id: 0, productName: '', price: 0, quantity: 0 };

  addItem(): void {
    this.itemAdded.emit(this.item);
    this.item = { id: 0, productName: '', price: 0, quantity: 0 };
  }
}
