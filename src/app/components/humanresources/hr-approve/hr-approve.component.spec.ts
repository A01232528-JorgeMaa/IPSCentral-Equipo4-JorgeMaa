import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApproveComponent } from './hr-approve.component';

describe('HrApproveComponent', () => {
  let component: HrApproveComponent;
  let fixture: ComponentFixture<HrApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
