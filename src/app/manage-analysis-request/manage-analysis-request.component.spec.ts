import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnalysisRequestComponent } from './manage-analysis-request.component';

describe('ManageAnalysisRequestComponent', () => {
  let component: ManageAnalysisRequestComponent;
  let fixture: ComponentFixture<ManageAnalysisRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAnalysisRequestComponent]
    });
    fixture = TestBed.createComponent(ManageAnalysisRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
