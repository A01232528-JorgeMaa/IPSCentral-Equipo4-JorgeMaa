import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInfoComponent } from './load-info.component';

describe('LoadInfoComponent', () => {
  let component: LoadInfoComponent;
  let fixture: ComponentFixture<LoadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
