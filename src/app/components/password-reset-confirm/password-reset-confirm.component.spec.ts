import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetConfirmComponent } from './password-reset-confirm.component';

describe('PasswordResetConfirmComponent', () => {
  let component: PasswordResetConfirmComponent;
  let fixture: ComponentFixture<PasswordResetConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetConfirmComponent]
    });
    fixture = TestBed.createComponent(PasswordResetConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
