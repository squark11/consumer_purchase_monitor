import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ProductCoverComponent } from './pages/products/product-cover/product-cover.component';
import { AddReviewComponent } from './pages/reviews/add-review/add-review.component';
import { UpdateReviewComponent } from './pages/reviews/update-review/update-review.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PurchaseListComponent } from './pages/purchase/purchase-list/purchase-list.component';
import { PurchaseDetailComponent } from './pages/purchase/purchase-detail/purchase-detail.component';
import { UpdateExpenseLimitComponent } from './pages/purchase/update-expense-limit/update-expense-limit.component';
import { AddPurchaseComponent } from './pages/purchase/add-purchase/add-purchase.component';

const routes: Routes = [
  { path: '', component: ProductsComponent,  canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'product-cover', component: ProductCoverComponent},
  { path: 'product-cover/:id', component: ProductCoverComponent},
  { path: 'products/:productId/reviews', component: ReviewsComponent },
  { path: 'products/:productId/reviews/add', component: AddReviewComponent },
  { path: 'products/:productId/reviews/:reviewId/update', component: UpdateReviewComponent },
  { path: 'purchases', component: PurchaseListComponent, canActivate: [AuthGuard] },
  { path: 'purchases/:id', component: PurchaseDetailComponent, canActivate: [AuthGuard] },
  { path: 'add-purchase', component: AddPurchaseComponent, canActivate: [AuthGuard] },
  { path: 'update-expense-limit', component: UpdateExpenseLimitComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }