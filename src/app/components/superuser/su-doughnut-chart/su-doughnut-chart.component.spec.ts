import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuDoughnutChartComponent } from './su-doughnut-chart.component';

describe('SuDoughnutChartComponent', () => {
  let component: SuDoughnutChartComponent;
  let fixture: ComponentFixture<SuDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
