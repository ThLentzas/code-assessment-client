import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintsDetailComponent } from './constraints-detail.component';

describe('ConstraintsDetailComponent', () => {
  let component: ConstraintsDetailComponent;
  let fixture: ComponentFixture<ConstraintsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstraintsDetailComponent]
    });
    fixture = TestBed.createComponent(ConstraintsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
