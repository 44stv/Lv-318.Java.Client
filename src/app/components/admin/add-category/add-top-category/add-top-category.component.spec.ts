import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopCategoryComponent } from './add-top-category.component';

describe('AddTopCategoryComponent', () => {
  let component: AddTopCategoryComponent;
  let fixture: ComponentFixture<AddTopCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
