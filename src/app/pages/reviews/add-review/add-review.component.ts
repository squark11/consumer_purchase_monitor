import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductReviewsService } from 'src/app/services/product-reviews.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  productId: number;
  comment: string;
  rating: number;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productReviewsService: ProductReviewsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['productId']; 
    });
  }

  addReview(): void {
    this.errorMessage = null; 
    this.productReviewsService.addProductReview(this.productId, this.comment, this.rating)
      .subscribe(
        () => {
          this.goBack();
        },
        error => {
          this.errorMessage = 'Failed to add review. Please try again later.';
          console.error('Error adding review:', error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/product-cover', this.productId]);
  }
}