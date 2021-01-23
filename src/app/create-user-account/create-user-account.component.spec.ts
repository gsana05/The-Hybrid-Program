import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAccount } from './create-user-account.component';

describe('LogInComponent', () => {
  let component: CreateUserAccount;
  let fixture: ComponentFixture<CreateUserAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserAccount ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
