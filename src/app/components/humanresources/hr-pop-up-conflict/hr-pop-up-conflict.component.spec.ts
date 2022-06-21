import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPopUpConflictComponent } from './hr-pop-up-conflict.component';

describe('HrPopUpConflictComponent', () => {
  let component: HrPopUpConflictComponent;
  let fixture: ComponentFixture<HrPopUpConflictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrPopUpConflictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPopUpConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
