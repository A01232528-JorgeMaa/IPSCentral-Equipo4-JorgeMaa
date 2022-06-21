import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuPieChartComponent } from './su-pie-chart.component';

describe('SuPieChartComponent', () => {
  let component: SuPieChartComponent;
  let fixture: ComponentFixture<SuPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
