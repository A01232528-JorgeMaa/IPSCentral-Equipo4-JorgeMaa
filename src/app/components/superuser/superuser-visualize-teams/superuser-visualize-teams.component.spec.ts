import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserVisualizeTeamsComponent } from './superuser-visualize-teams.component';

describe('SuperuserVisualizeTeamsComponent', () => {
  let component: SuperuserVisualizeTeamsComponent;
  let fixture: ComponentFixture<SuperuserVisualizeTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserVisualizeTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserVisualizeTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
