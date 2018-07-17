import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConfComponent } from './users-conf.component';

describe('UsersConfComponent', () => {
  let component: UsersConfComponent;
  let fixture: ComponentFixture<UsersConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
