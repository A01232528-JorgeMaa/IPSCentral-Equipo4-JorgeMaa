import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MANAGEUSERSComponent } from './manage-users.component';

describe('MANAGEUSERSComponent', () => {
  let component: MANAGEUSERSComponent;
  let fixture: ComponentFixture<MANAGEUSERSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MANAGEUSERSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MANAGEUSERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
