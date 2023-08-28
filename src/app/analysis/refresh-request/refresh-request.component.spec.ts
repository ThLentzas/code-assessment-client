import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshRequestComponent } from './refresh-request.component';

describe('RefreshRequestComponent', () => {
  let component: RefreshRequestComponent;
  let fixture: ComponentFixture<RefreshRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreshRequestComponent]
    });
    fixture = TestBed.createComponent(RefreshRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
