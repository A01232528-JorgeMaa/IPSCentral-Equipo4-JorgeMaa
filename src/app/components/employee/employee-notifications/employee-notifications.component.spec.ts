import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNotificationsComponent } from './employee-notifications.component';

describe('EmployeeNotificationsComponent', () => {
  let component: EmployeeNotificationsComponent;
  let fixture: ComponentFixture<EmployeeNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
