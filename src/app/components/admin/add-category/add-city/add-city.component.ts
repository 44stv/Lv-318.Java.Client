import {Component, OnInit} from '@angular/core';
import {ExcategoryService} from '../../../../services/excategory.service';
import {Category} from '../../../../models/category.model';
import {Location} from '@angular/common';
import {ExcategoryModel} from '../../../../models/excategory.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../../update-role/update-role.component';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  categoryModel = new ExcategoryModel();
  topCategories: Category[] = [];
  selectedCategory: ExcategoryModel;
  cityName: string;

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
    console.log(this.categoryModel);
  }

  saveCategory(): void {
    console.log(this.cityName);
    if (this.cityName !== undefined && this.selectedCategory !== undefined) {
      this.add(this.cityName, this.selectedCategory);
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
    } else {
      this.snackBar.open('City name should not be empty', null, {
        duration: 2000
      });
    }
  }

  add(city: string, top: ExcategoryModel) {
    this.categoryModel.name = city;
    this.categoryModel.nextLevelCategory = top;
  }

  close() {
    this.matDialogRef.close();
  }

}
