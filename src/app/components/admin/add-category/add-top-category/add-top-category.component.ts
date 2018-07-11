import {Component, OnInit} from '@angular/core';
import {getAllRoles} from '../../../../services/auth/roles';
import {Location} from '@angular/common';
import {UserService} from '../../../../services/user.service';
import {UpdateRoleModel} from '../../../../models/update-role.model';
import {Category} from '../../../../models/category.model';
import {Observable} from 'rxjs';
import {ExcategoryModel} from '../../../../models/excategory.model';
import {ExcategoryService} from '../../../../services/excategory.service';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';


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

  gotBack(): void {
    this.location.back();
  }

  close() {
    this.gotBack();
  }
}
