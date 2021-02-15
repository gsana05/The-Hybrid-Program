import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFreeProgramComponent } from './join-free-program.component';

describe('JoinFreeProgramComponent', () => {
  let component: JoinFreeProgramComponent;
  let fixture: ComponentFixture<JoinFreeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinFreeProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFreeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
