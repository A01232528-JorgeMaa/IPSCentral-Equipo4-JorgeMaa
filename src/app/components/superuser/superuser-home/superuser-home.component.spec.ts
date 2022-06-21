import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserHomeComponent } from './superuser-home.component';

describe('SuperuserHomeComponent', () => {
  let component: SuperuserHomeComponent;
  let fixture: ComponentFixture<SuperuserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
