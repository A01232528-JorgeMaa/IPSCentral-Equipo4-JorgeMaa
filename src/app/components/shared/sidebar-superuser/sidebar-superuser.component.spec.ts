import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSuperuserComponent } from './sidebar-superuser.component';

describe('SidebarSuperuserComponent', () => {
  let component: SidebarSuperuserComponent;
  let fixture: ComponentFixture<SidebarSuperuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSuperuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSuperuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
