import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesDetailComponent } from './preferences-detail.component';

describe('PreferencesDetailComponent', () => {
  let component: PreferencesDetailComponent;
  let fixture: ComponentFixture<PreferencesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferencesDetailComponent]
    });
    fixture = TestBed.createComponent(PreferencesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
