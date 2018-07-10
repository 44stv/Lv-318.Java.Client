import { Component, Input, OnInit } from '@angular/core';
import { MyComment } from '../../../../../../../../models/comment.model';
import { CommentService } from '../../../../../../../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: MyComment;
  modified: boolean;

  childComments: MyComment[];

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.modified = this.comment.modifiedDate != null;
    if (this.comment.parent) {
      this.getChildrenComments();
    }
  }

  getChildrenComments() {
    console.log('get children comments' + this.comment.id);
    this.commentService.getChildrenComments(this.comment.id)
      .subscribe(childComments => {
        this.childComments = childComments;
        console.log(this.childComments);
      });
  }

}
