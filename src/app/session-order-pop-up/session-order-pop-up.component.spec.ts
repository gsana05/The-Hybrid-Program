import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionOrderPopUpComponent } from './session-order-pop-up.component';

describe('SessionOrderPopUpComponent', () => {
  let component: SessionOrderPopUpComponent;
  let fixture: ComponentFixture<SessionOrderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionOrderPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
