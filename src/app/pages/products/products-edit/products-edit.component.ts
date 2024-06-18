import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductItem } from 'src/app/models/product-models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent {
  @Input() product: ProductItem;

  constructor(public activeModal: NgbActiveModal, private productService: ProductsService) {}

  save(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
      this.activeModal.close('saved');
    }, error => {
      console.error('Błąd podczas aktualizacji produktu:', error);
      console.log(this.product);
    });
  }
}
