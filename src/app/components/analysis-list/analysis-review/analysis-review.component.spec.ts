import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisReviewComponent } from './analysis-review.component';

describe('AnalysisReviewComponent', () => {
  let component: AnalysisReviewComponent;
  let fixture: ComponentFixture<AnalysisReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisReviewComponent]
    });
    fixture = TestBed.createComponent(AnalysisReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
