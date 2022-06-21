import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPieChartComponent } from './hr-pie-chart.component';

describe('HrPieChartComponent', () => {
  let component: HrPieChartComponent;
  let fixture: ComponentFixture<HrPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
