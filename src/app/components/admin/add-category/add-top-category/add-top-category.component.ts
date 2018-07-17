import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Category} from '../../../../models/category.model';
import {ExcategoryService} from '../../../../services/excategory.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../../update-role/update-role.component';


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
              private router: Router,
              private  matDialogRef: MatDialogRef<UpdateRoleComponent>,
  ) {

  }

  ngOnInit() {
  }

  saveCategory(): void {
    if (this.categoryModel.name !== undefined) {
      this.excatServ.save(this.categoryModel).subscribe(() => {
        this.snackBar.open('Category added sucsessfully.', null, {
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
      this.snackBar.open('The name should not be empty' , null, {
        duration: 2000
      });
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
