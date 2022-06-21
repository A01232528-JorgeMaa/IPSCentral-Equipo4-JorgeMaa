import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLoadInfoComponent } from './pop-up-load-info.component';

describe('PopUpLoadInfoComponent', () => {
  let component: PopUpLoadInfoComponent;
  let fixture: ComponentFixture<PopUpLoadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpLoadInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpLoadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
