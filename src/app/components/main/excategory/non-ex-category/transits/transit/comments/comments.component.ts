import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../../../../services/comment.service';
import { MyComment } from '../../../../../../../models/comment.model';
import 'rxjs/add/observable/of';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CustomAuthService } from '../../../../../../../services/auth/custom-auth.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {

  @Input() id: number;
  addCommentText: string;
  successMessage = 'Comment posted';
  failedMessage = 'Empty comment';
  loginMessage = 'Please, log in';
  action = 'Hide';
  sortMode = 'ASC';

  comments: MyComment[];

  constructor(private commentService: CommentService,
              public snackBar: MatSnackBar,
              private authService: CustomAuthService) {
  }

  ngOnInit() {
    this.getTopLevelComments();
    console.log(this.authService.getUserId());
  }

  getTopLevelComments() {
    this.commentService.getTopComments(this.id).subscribe(comments => {
      this.comments = comments;
    });
  }

  // TODO: get user id form authService
  addTopLevelComment() {
    if (this.authService.hasToken()) {
      const newComment = new MyComment();
      if (this.addCommentText) {
        newComment.commentText = this.addCommentText;
        let params = new HttpParams();
        params = params.set('transitId', this.id.toString());
        params = params.set('userId', this.authService.getUserId().toString());
        this.commentService.addComment(params, newComment)
          .subscribe(comment => {
            console.log(comment);
            this.getTopLevelComments();
          });
        this.openSnackBar(this.successMessage);
      } else {
        this.openSnackBar(this.failedMessage);
      }
    } else {
      this.openSnackBar(this.loginMessage);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }

  sortComments(): void {
    if (this.sortMode === 'DESC') {
      this.comments.sort((a, b) => a.postDate.localeCompare(b.postDate));
    }
    if (this.sortMode === 'ASC') {
      this.comments.sort((a, b) => b.postDate.localeCompare(a.postDate));
    }
  }
}

