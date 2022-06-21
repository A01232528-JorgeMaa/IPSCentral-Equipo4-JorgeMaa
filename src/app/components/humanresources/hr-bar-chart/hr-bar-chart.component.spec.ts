import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBarChartComponent } from './hr-bar-chart.component';

describe('HrBarChartComponent', () => {
  let component: HrBarChartComponent;
  let fixture: ComponentFixture<HrBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
