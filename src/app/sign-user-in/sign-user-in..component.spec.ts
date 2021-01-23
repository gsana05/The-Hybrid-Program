import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUserIn } from './sign-user-in..component';

describe('CreateAccountComponent', () => {
  let component: SignUserIn;
  let fixture: ComponentFixture<SignUserIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUserIn ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUserIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
