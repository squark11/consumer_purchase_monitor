import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpenseLimitComponent } from './update-expense-limit.component';

describe('UpdateExpenseLimitComponent', () => {
  let component: UpdateExpenseLimitComponent;
  let fixture: ComponentFixture<UpdateExpenseLimitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateExpenseLimitComponent]
    });
    fixture = TestBed.createComponent(UpdateExpenseLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
