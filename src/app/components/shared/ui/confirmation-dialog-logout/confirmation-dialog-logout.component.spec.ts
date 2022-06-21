import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogLogoutComponent } from './confirmation-dialog-logout.component';

describe('ConfirmationDialogLogoutComponent', () => {
  let component: ConfirmationDialogLogoutComponent;
  let fixture: ComponentFixture<ConfirmationDialogLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
