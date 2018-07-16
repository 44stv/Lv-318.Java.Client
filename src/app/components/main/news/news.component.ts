import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NewsModel } from "../../../models/news.model";
import { NewsService } from "../../../services/news.service";
import { PageableClass, Sort } from "../../../models/paginator.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  data: NewsPaginator;
  page: number = 0;
  size: number = 4;
  index: number = 0;
  mainNews: NewsModel[];
  selectedNews: NewsModel;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private newsService: NewsService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllNews(this.page, this.size);
    this.newsService.getNews(0, 5)
      .subscribe(data => {
        this.mainNews = data.content;
      });
  }

  openNews() {
    this.selectedNews = this.data.content[0];
    this.dialog.open(ReadNewsComponent, {
      width: '60%', height: '50%', data: this.selectedNews
    });

  }

  getAllNews(page: number, size: number) {
    this.newsService.getNews(page, size)
      .subscribe(data => {
        this.data = data;
      });
  }

  nextNews() {
    if (this.page < this.data.totalPages - 1) {
      this.page++;
      this.getAllNews(this.page, this.size);
    }
  }

  previousNews() {
    if (this.page > 0) {
      this.page--;
      this.getAllNews(this.page, this.size);
    }
  }

  right() {
    this.index == 4 ? this.index = 0 : this.index++;
    console.log(this.index);
  }

  left() {
    this.index == 0 ? this.index = 4 : this.index--;
    console.log(this.index);
  }
}

export interface NewsPaginator {
  content: NewsModel[];
  pageable: PageableClass;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
}

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
})
export class ReadNewsComponent {

  constructor(
    public dialogRef: MatDialogRef<ReadNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


