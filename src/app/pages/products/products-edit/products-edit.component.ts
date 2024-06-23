import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductItem } from 'src/app/models/product-models';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent {

  @Input() product: ProductItem;

  edited;

  constructor(public activeModal: NgbActiveModal, 
              private productService: ProductsService,
              private alert: AlertService) {}

  ngOnInit(): void {
    this.edited={...this.product}
  }            

  save(): void {
    this.productService.updateProduct(this.product.id, this.edited).subscribe(() => {
      this.activeModal.close('saved');
      this.alert.success('Success updating product');
    }, error => {
      console.error('Error updating product:', error);
      this.alert.error('Something went wrong');
      console.log(this.product);
    });
  }

  cancel() {
    this.edited = this.product;
    }

}
