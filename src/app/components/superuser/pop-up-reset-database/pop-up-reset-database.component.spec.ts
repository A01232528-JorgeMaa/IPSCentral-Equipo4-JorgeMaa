import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpResetDatabaseComponent } from './pop-up-reset-database.component';

describe('PopUpResetDatabaseComponent', () => {
  let component: PopUpResetDatabaseComponent;
  let fixture: ComponentFixture<PopUpResetDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpResetDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpResetDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
