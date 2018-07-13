import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MyComment } from "../../../../../../../../models/comment.model";

@Component({
  selector: 'app-top-level-comments',
  templateUrl: './top-level-comments.component.html',
  styleUrls: ['./top-level-comments.component.scss']
})
export class TopLevelCommentsComponent implements OnInit {

  @Input() comments: MyComment[];

  constructor() { }

  ngOnInit() {
  }

}
