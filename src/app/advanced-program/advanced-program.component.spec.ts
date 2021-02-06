import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedProgramComponent } from './advanced-program.component';

describe('AdvancedProgramComponent', () => {
  let component: AdvancedProgramComponent;
  let fixture: ComponentFixture<AdvancedProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
