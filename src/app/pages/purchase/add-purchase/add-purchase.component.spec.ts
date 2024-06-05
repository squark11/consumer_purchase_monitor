import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseComponent } from './AddPurchaseComponent';

describe('AddPurchaseComponent', () => {
  let component: AddPurchaseComponent;
  let fixture: ComponentFixture<AddPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPurchaseComponent]
    });
    fixture = TestBed.createComponent(AddPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
