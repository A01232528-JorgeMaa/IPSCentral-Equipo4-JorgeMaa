import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAddUserComponent } from './pop-up-add-user.component';

describe('PopUpAddUserComponent', () => {
  let component: PopUpAddUserComponent;
  let fixture: ComponentFixture<PopUpAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
