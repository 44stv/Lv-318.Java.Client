import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonextendableCategoryComponent } from './add-nonextendable-category.component';

describe('AddNonextendableCategoryComponent', () => {
  let component: AddNonextendableCategoryComponent;
  let fixture: ComponentFixture<AddNonextendableCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNonextendableCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNonextendableCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
