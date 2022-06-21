import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuBarChartComponent } from './su-bar-chart.component';

describe('SuBarChartComponent', () => {
  let component: SuBarChartComponent;
  let fixture: ComponentFixture<SuBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
