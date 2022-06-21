import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserLoadFileComponent } from './superuser-load-file.component';

describe('SuperuserLoadFileComponent', () => {
  let component: SuperuserLoadFileComponent;
  let fixture: ComponentFixture<SuperuserLoadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserLoadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserLoadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
