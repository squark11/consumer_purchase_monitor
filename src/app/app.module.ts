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


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCoverComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    CommentsComponent,
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
