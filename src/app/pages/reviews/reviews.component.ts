import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/models/pagination';
import { reviewItem} from 'src/app/models/review.models'; 
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductReviewsService } from 'src/app/services/product-reviews.service';
import { AlertService } from 'src/app/services/alert.service'; 

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() productId: number;
  reviews: reviewItem[];
  canAddReview: boolean;

  pagination: Pagination = {
    totalPages: null,
    itemsFrom: 1,
    itemsTo: 5,
    totalItemsCount: null
  };

  filter: any = {
    PageNumber: this.pagination.itemsFrom,
    PageSize: this.pagination.itemsTo, 
    sortBy: 'newest'
  };

  constructor(
    private route: ActivatedRoute,
    private productReviewsService: ProductReviewsService,
    protected authService: AuthenticationService,
    private alertService: AlertService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id'); 
    });
    this.loadReviews();
  }

  loadReviews(): void {
    this.productReviewsService.getProductReviews(this.productId, this.filter).subscribe(
      reviews => {
        this.reviews = reviews.items;
        this.pagination = reviews;
        this.canAddReview = !this.reviews.some(review => review.hasUserCreated);
      },
      error => {
        console.error('Error loading reviews:', error);
        this.alertService.error('Failed to load reviews. Please try again later.'); 
      }
    );
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.productReviewsService.deleteProductReview(this.productId, reviewId).subscribe(
        () => {
          this.loadReviews();
          this.alertService.success('Review deleted successfully'); 
        },
        error => {
          console.error('Error deleting review:', error);
          this.alertService.error('Failed to delete review. Please try again later.'); 
        }
      );
    }
  }
}
