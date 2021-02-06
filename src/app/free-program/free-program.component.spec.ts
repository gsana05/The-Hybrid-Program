import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeProgramComponent } from './free-program.component';

describe('FreeProgramComponent', () => {
  let component: FreeProgramComponent;
  let fixture: ComponentFixture<FreeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
