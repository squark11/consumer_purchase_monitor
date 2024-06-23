import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductItem } from 'src/app/models/product-models';

import { ProductsService } from 'src/app/services/products.service';
import { ProductsEditComponent } from '../products-edit/products-edit.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-cover',
  templateUrl: './product-cover.component.html',
  styleUrls: ['./product-cover.component.css']
})
export class ProductCoverComponent {
  product:ProductItem;
  constructor(private route:ActivatedRoute, 
    private productService:ProductsService,
    private router: Router,
    private modalService: NgbModal,
    private alerts:AlertService,
    protected auth:AuthenticationService
  ){}
  id:string;

  protected selectedTab: string = 'comments';

  getSelectedTab(): string {
    return this.selectedTab;
  }

  setSelectedTab(tab: string): void {
    this.selectedTab = tab;
  }

ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.productService.getProductByID(this.id).subscribe(product=>this.product=product)
}

openEditModal(): void {
  const modalRef = this.modalService.open(ProductsEditComponent);
  modalRef.componentInstance.product = this.product;
  modalRef.result.then((result) => {
    if (result === 'saved') {
      this.productService.getProductByID(this.id).subscribe(product => this.product = product);
    }
  }).catch((error) => {
    console.error('Error opening edit modal', error);
  });
}

deleteProduct(): void {
  if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.router.navigate(['/products']);
      this.alerts.success("Deleted: "+this.product.name)
    }, error => {
      console.error('Something went wrong', error);
      this.alerts.error('Somethig went wrong');
    });
  }
}
}
