import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNotificationsComponent } from './hr-notifications.component';

describe('HrNotificationsComponent', () => {
  let component: HrNotificationsComponent;
  let fixture: ComponentFixture<HrNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
