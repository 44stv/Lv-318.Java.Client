import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../../../../models/category.model';
import { ExcategoryService } from '../../../../services/excategory.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-top-category',
  templateUrl: './add-top-category.component.html',
  styleUrls: ['./add-top-category.component.css']
})
export class AddTopCategoryComponent implements OnInit {

  categoryModel = new Category();

  constructor(private location: Location,
    private excatServ: ExcategoryService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit() {
  }

  saveCategory(): void {
    this.excatServ.save(this.categoryModel).subscribe(() => {
      this.snackBar.open('Category added sucsessfully.', null, {
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

  close() {
    this.location.back();
  }
}
