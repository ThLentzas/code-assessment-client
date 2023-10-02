import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetErrorComponent } from './password-reset-error.component';

describe('PasswordResetErrorComponent', () => {
  let component: PasswordResetErrorComponent;
  let fixture: ComponentFixture<PasswordResetErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetErrorComponent]
    });
    fixture = TestBed.createComponent(PasswordResetErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
