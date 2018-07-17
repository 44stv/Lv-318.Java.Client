import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '../../../../models/category.model';
import {ExcategoryService} from '../../../../services/excategory.service';
import {MatSnackBar} from '@angular/material';
import {ExcategoryModel} from '../../../../models/excategory.model';
import {Location} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../../update-role/update-role.component';

@Component({
  selector: 'app-add-nonextendable-category',
  templateUrl: './add-nonextendable-category.component.html',
  styleUrls: ['./add-nonextendable-category.component.css']
})
export class AddNonextendableCategoryComponent implements OnInit {

  categoryModel = new ExcategoryModel();
  topCategories: Category[] = [];
  selectedCategory: ExcategoryModel;
  selectedCity: ExcategoryModel;
  cities: ExcategoryModel[];
  typeTransportName: string;

  constructor(private location: Location,
              private excatServ: ExcategoryService,
              private snackBar: MatSnackBar,
              private router: Router,
              private  matDialogRef: MatDialogRef<UpdateRoleComponent>,
  ) {

  }

  ngOnInit() {
    this.excatServ.getTopCategories().subscribe(
      result => this.topCategories = result
    );
  }

  saveCategory(): void {
    this.add(this.typeTransportName, this.selectedCity, this.selectedCategory);
    this.excatServ.save(this.categoryModel).subscribe(() => {
      this.snackBar.open('City added sucsessfully.', null, {
        duration: 2000
      });
      this.matDialogRef.close();
    }, error => {
      this.snackBar.open('Provider  with the such name is already exists in database .'
        , null, {
          duration: 2000
        });
    });
  }

  getCities(selectedCategory: ExcategoryModel) {
    this.excatServ.getCategoriesByNextLevel(selectedCategory.name).subscribe(
      result => this.cities = result
  );
  }

  add(type: string, city: ExcategoryModel, top: ExcategoryModel) {
    if (!(top == null && city == null && type == null)) {
      this.categoryModel.name = type;
      this.selectedCity.nextLevelCategory = top;
      this.categoryModel.nextLevelCategory = this.selectedCity;
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
