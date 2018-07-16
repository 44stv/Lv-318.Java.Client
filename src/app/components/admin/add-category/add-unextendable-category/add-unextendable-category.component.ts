import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '../../../../models/category.model';
import {ExcategoryService} from '../../../../services/excategory.service';
import {MatSnackBar} from '@angular/material';
import {ExcategoryModel} from '../../../../models/excategory.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-unextendable-category',
  templateUrl: './add-unextendable-category.component.html',
  styleUrls: ['./add-unextendable-category.component.css']
})
export class AddUnextendableCategoryComponent implements OnInit {

  categoryModel = new ExcategoryModel();
  topCategories: Category[] = [];
  selectedCategory: ExcategoryModel;
  cityName: string;

  constructor(private location: Location,
              private excatServ: ExcategoryService,
              private snackBar: MatSnackBar,
              private router: Router) {

  }

  ngOnInit() {
    this.excatServ.getTopCategories().subscribe(
      result => this.topCategories = result
    );
    console.log(this.categoryModel);
  }

  saveCategory(): void {
    this.add(this.cityName, this.selectedCategory);
    this.excatServ.save(this.categoryModel).subscribe(() => {
      this.snackBar.open('City added sucsessfully.', null, {
        duration: 2000
      });
      this.router.navigate(['/main/admin']);
    }, error => {
      this.snackBar.open('Provider  with the such name is already exists in database .'
        , null, {
          duration: 2000
        });
    });
  }

  add(city: string, top: ExcategoryModel) {
    if (!(top == null && city == null)) {
      this.categoryModel.name = city;
      this.categoryModel.nextLevelCategory = top;
    }
  }

  close() {
    this.location.back();
  }
}
