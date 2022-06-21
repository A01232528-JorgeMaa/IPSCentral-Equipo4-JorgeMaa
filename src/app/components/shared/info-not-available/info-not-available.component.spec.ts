import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNotAvailableComponent } from './info-not-available.component';

describe('InfoNotAvailableComponent', () => {
  let component: InfoNotAvailableComponent;
  let fixture: ComponentFixture<InfoNotAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoNotAvailableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoNotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
