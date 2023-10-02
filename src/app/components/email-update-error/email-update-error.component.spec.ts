import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUpdateErrorComponent } from './email-update-error.component';

describe('EmailUpdateErrorComponent', () => {
  let component: EmailUpdateErrorComponent;
  let fixture: ComponentFixture<EmailUpdateErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailUpdateErrorComponent]
    });
    fixture = TestBed.createComponent(EmailUpdateErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
