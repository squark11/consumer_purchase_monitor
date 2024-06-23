import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductItem, ProductResponse } from 'src/app/models/product-models';
import { AlertService } from 'src/app/services/alert.service';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  @Output() appAddProduct: EventEmitter<any> = new EventEmitter();

constructor(private productService:ProductsService, private alerts:AlertService){}

  product:ProductItem = {
    name: '',
    description: '',
    price: '',
    category: ''
  };

  addProduct() {
    this.productService.addProduct(this.product).subscribe(
      result => {
        this.appAddProduct.emit()
        console.log('Product added successfully:', result);
        this.alerts.success('Product added successfully');
      },
      error => {
        console.error('Error adding product:', error);
        this.alerts.error('Error adding product')
      }
    );
  }

  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
    this.appAddProduct.emit()
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
