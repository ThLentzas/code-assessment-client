import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintComponent } from './constraint.component';

describe('ConstraintComponent', () => {
  let component: ConstraintComponent;
  let fixture: ComponentFixture<ConstraintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstraintComponent]
    });
    fixture = TestBed.createComponent(ConstraintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
