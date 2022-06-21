import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApproveteamsComponent } from './hr-approveteams.component';

describe('HrApproveteamsComponent', () => {
  let component: HrApproveteamsComponent;
  let fixture: ComponentFixture<HrApproveteamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApproveteamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrApproveteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
