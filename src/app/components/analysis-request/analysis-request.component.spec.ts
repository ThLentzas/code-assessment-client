import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisRequestComponent } from './analysis-request.component';

describe('AnalysisRequestComponent', () => {
  let component: AnalysisRequestComponent;
  let fixture: ComponentFixture<AnalysisRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisRequestComponent]
    });
    fixture = TestBed.createComponent(AnalysisRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
