import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reviewItem } from 'src/app/models/review-models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductReviewsService } from 'src/app/services/product-reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent{
  @Input() productId:number;
  reviews: reviewItem[];
  canAddReview:boolean;

  constructor(
    private route: ActivatedRoute,
    private productReviewsService: ProductReviewsService,
    protected authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id'); 
    });
    this.loadReviews();
  }

  loadReviews() {
    this.productReviewsService.getProductReviews(this.productId).subscribe(reviews => {
      this.reviews = reviews.items;
      if (this.reviews.some(review => review.hasUserCreated)) {
        this.canAddReview = false;
      }else{
        this.canAddReview = true;
      }
    });
  }

  deleteReview(reviewId: number) {
    if (confirm('Czy na pewno chcesz usunąć tę recenzję?')) {
      this.productReviewsService.deleteProductReview(this.productId, reviewId).subscribe(() => {
        this.loadReviews();
      });
    }
  }
}
