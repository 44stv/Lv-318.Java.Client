import { Component, Input, OnInit } from '@angular/core';
import { MyComment } from '../../../../../../../../models/comment.model';
import { CommentService } from '../../../../../../../../services/comment.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: MyComment;
  modified: boolean;

  testComment: MyComment = new MyComment();

  childComments: MyComment[];

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.testComment.commentText = 'testangular';
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
      });
  }

  addChildComment(transitId: number, userId: number, newComment: MyComment) {
    let params = new HttpParams();
    params = params.set('transitId', transitId.toString());
    params = params.set('userId', userId.toString());
    params = params.set('parentId', this.comment.id.toString());
    this.commentService.addComment(params, newComment)
        .subscribe(comment => console.log(comment));
  }

}
