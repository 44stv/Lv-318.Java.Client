import {Component, OnInit} from '@angular/core';
import {ExcategoryService} from '../../../services/excategory.service';
import {FormBuilder} from '@angular/forms';
import {getAllCategoryLevel} from './category-level.model';
import {Location} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {UpdateRoleComponent} from '../update-role/update-role.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  catLevel: string = '';
  levels: string[] = getAllCategoryLevel();

  constructor(private exCategotyService: ExcategoryService,
              private formBuilder: FormBuilder,
              private location: Location,
              private  matDialogRef: MatDialogRef<UpdateRoleComponent>,
  ) {
  }

  ngOnInit() {
    this.levels = getAllCategoryLevel();
    console.log(this.levels);

  }

  close() {
    this.matDialogRef.close();
  }

}



