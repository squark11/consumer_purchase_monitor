import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCoverComponent } from './comment-cover.component';

describe('CommentCoverComponent', () => {
  let component: CommentCoverComponent;
  let fixture: ComponentFixture<CommentCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentCoverComponent]
    });
    fixture = TestBed.createComponent(CommentCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
