import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { CommentService } from '../../../../../../../services/comment.service';
import { MyComment } from '../../../../../../../models/comment.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {

  @Input() id: number;

  comments: MyComment[];


  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.getTopLevelComments(this.id);
  }

  getTopLevelComments(transitId: number) {
    this.commentService.getTopComments(transitId).subscribe(comments => this.comments = comments);
  }

}

