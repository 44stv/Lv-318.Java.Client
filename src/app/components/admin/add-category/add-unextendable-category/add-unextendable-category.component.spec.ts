import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnextendableCategoryComponent } from './add-unextendable-category.component';

describe('AddUnextendableCategoryComponent', () => {
  let component: AddUnextendableCategoryComponent;
  let fixture: ComponentFixture<AddUnextendableCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnextendableCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnextendableCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
