import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './pages/products/products.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ProductCoverComponent } from './pages/products/product-cover/product-cover.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentCoverComponent } from './pages/comments/comment-cover/comment-cover.component';
import { CommentRepliesComponent } from './pages/comments/comment-replies/comment-replies.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AddReviewComponent } from './pages/reviews/add-review/add-review.component';
import { UpdateReviewComponent } from './pages/reviews/update-review/update-review.component';
import { PurchaseListComponent } from './pages/purchase/purchase-list/purchase-list.component';
import { PurchaseDetailComponent } from './pages/purchase/purchase-detail/purchase-detail.component';
import { UpdateExpenseLimitComponent } from './pages/purchase/update-expense-limit/update-expense-limit.component';
import { AddItemComponent } from './pages/purchase/add-item/add-item.component';
import { AddPurchaseComponent } from './pages/purchase/add-purchase/add-purchase.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { CommentReportsComponent } from './pages/reports/comment-reports/comment-reports.component';
import { ProductReportsComponent } from './pages/reports/product-reports/product-reports.component';
import { ReviewReportsComponent } from './pages/reports/review-reports/review-reports.component';
import { EditReportComponent } from './pages/reports/edit-report/edit-report.component';
import { AddReportComponent } from './pages/reports/add-report/add-report.component';
import { CommentEditComponent } from './pages/comments/comment-edit/comment-edit.component';
import { ProductsEditComponent } from './pages/products/products-edit/products-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCoverComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    CommentsComponent,
    CommentCoverComponent,
    CommentRepliesComponent,
    ReviewsComponent,
    AddReviewComponent,
    UpdateReviewComponent,
    PurchaseListComponent,
    PurchaseDetailComponent,
    AddPurchaseComponent,
    UpdateExpenseLimitComponent,
    AddItemComponent,
    ReportsComponent,
    CommentReportsComponent,
    ProductReportsComponent,
    ReviewReportsComponent,
    EditReportComponent,
    AddReportComponent,
    CommentEditComponent,
    ProductsEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule 
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


],
  bootstrap: [AppComponent]
})
export class AppModule { }
