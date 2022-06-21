import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHumanresourcesComponent } from './sidebar-humanresources.component';

describe('SidebarHumanresourcesComponent', () => {
  let component: SidebarHumanresourcesComponent;
  let fixture: ComponentFixture<SidebarHumanresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarHumanresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHumanresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
