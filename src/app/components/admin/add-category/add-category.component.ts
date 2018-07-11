import {Component, OnInit} from '@angular/core';
import {ExcategoryService} from '../../../services/excategory.service';
import {NonExCategoryService} from '../../../services/non-ex-category.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {CategoryLevel, getAllCategoryLevel} from './category-level.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  catLevel: any;
  levels: string[] = getAllCategoryLevel();

  constructor(private exCategotyService: ExcategoryService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.levels = getAllCategoryLevel();
    // this.topCategories = this.exCategotyService.getTopCategories();
    console.log(this.levels);

  }

}



