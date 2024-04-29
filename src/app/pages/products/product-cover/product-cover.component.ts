import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-cover',
  templateUrl: './product-cover.component.html',
  styleUrls: ['./product-cover.component.css']
})
export class ProductCoverComponent {
  product:Item;
  constructor(private route:ActivatedRoute, private productService:ProductsService){}
ngOnInit(): void {
  let id = this.route.snapshot.paramMap.get('id');
  this.productService.getProductByID(id).subscribe(product=>this.product=product)
}
}
