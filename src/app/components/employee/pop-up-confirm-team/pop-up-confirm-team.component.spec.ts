import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpConfirmTeamComponent } from './pop-up-confirm-team.component';

describe('PopUpConfirmTeamComponent', () => {
  let component: PopUpConfirmTeamComponent;
  let fixture: ComponentFixture<PopUpConfirmTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpConfirmTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpConfirmTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
