import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDoughnutChartComponent } from './hr-doughnut-chart.component';

describe('HrDoughnutChartComponent', () => {
  let component: HrDoughnutChartComponent;
  let fixture: ComponentFixture<HrDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
