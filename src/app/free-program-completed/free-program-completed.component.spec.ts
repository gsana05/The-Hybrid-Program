import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeProgramCompletedComponent } from './free-program-completed.component';

describe('FreeProgramCompletedComponent', () => {
  let component: FreeProgramCompletedComponent;
  let fixture: ComponentFixture<FreeProgramCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeProgramCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeProgramCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
