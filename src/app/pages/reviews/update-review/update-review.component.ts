import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductReviewsService } from 'src/app/services/product-reviews.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {
  productId: number;
  reviewId: number;
  comment: string;
  rating: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productReviewsService: ProductReviewsService
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId');
    this.reviewId = +this.route.snapshot.paramMap.get('reviewId');
    this.route.queryParams.subscribe(params => {
      this.comment = params['comment'];
      this.rating = params['rating'];
    });
  }

  updateReview(): void {
    this.productReviewsService.updateProductReview(this.productId, this.reviewId, this.comment, this.rating)
      .subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.router.navigate(['/product-cover', this.productId]);
  }
}
