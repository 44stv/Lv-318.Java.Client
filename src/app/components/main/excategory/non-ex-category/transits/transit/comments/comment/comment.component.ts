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
  postCommentDate: string;
  modifiedCommentDate: string;

  childComments: MyComment[];

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.modified = this.comment.modifiedDate != null;
    this.postCommentDate = this.calculateTimeDiffBetweenNowAndDate(new Date(this.comment.postDate));
    this.modifiedCommentDate = this.calculateTimeDiffBetweenNowAndDate(new Date(this.comment.modifiedDate));

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

  calculateTimeDiffBetweenNowAndDate(end: Date): string {
    const nowTimeInSec = Date.now();
    const postCommentDateInSec = end.getTime();
    const timeDiffInMs = (nowTimeInSec - postCommentDateInSec);
    const timeDiffInMin = timeDiffInMs / 1000 / 60;
    const timeDiffInHours = timeDiffInMin / 60;
    const timeDiffInDays = timeDiffInHours / 24;

    if (timeDiffInMin < 60) {
      return `${Math.round(timeDiffInMin)} minutes ago`;
      // this.postCommentDate = `${Math.round(timeDiffInMin)} minutes ago`;
    }
    if (timeDiffInMin >= 60 && timeDiffInHours < 24) {
      return `${Math.round(timeDiffInHours)} hours ago`;
      // this.postCommentDate = `${Math.round(timeDiffInHours)} hours ago`;
    }
    if (timeDiffInHours >= 24) {
      return `${Math.round(timeDiffInDays)} days ago`;
      // this.postCommentDate = `${Math.round(timeDiffInDays)} days ago`;
    }
  }

}
