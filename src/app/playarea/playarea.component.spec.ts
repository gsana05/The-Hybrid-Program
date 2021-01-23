import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayareaComponent } from './playarea.component';

describe('PlayareaComponent', () => {
  let component: PlayareaComponent;
  let fixture: ComponentFixture<PlayareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
