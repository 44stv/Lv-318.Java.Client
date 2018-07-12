import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../../../../services/comment.service';
import { MyComment } from '../../../../../../../models/comment.model';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../../../../services/auth/auth.service';


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

  comments: MyComment[];

  constructor(private commentService: CommentService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              private location: Location) {
  }

  ngOnInit() {
    this.getTopLevelComments();
  }

  getTopLevelComments() {
    this.commentService.getTopComments(this.id).subscribe(comments => {
      this.comments = comments;
      console.log(comments);
    });
  }

  //TODO: get user id form authService
  addTopLevelComment(userId: number) {
    if (this.authService.hasToken()) {
      console.log(userId);
      const newComment = new MyComment();
      if (this.addCommentText) {
        newComment.commentText = this.addCommentText;
        let params = new HttpParams();
        params = params.set('transitId', this.id.toString());
        params = params.set('userId', userId.toString());
        this.commentService.addComment(params, newComment)
          .subscribe(comment => console.log(comment));
        this.openSnackBar(this.successMessage);
      } else {
        this.openSnackBar(this.failedMessage);
      }
    } else {
      this.openSnackBar(this.loginMessage);
    }
    window.location.reload();
    // this.location.back();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }
}

