import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportsComponent } from './product-reports.component';

describe('ProductReportsComponent', () => {
  let component: ProductReportsComponent;
  let fixture: ComponentFixture<ProductReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductReportsComponent]
    });
    fixture = TestBed.createComponent(ProductReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
