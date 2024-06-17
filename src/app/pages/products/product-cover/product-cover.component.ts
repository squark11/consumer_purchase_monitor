import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from 'src/app/models/product-models';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-cover',
  templateUrl: './product-cover.component.html',
  styleUrls: ['./product-cover.component.css']
})
export class ProductCoverComponent {
  product:ProductItem;
  constructor(private route:ActivatedRoute, private productService:ProductsService){}
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
}
