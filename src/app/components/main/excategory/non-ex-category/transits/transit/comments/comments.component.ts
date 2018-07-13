import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../../../../services/comment.service';
import { MyComment } from '../../../../../../../models/comment.model';
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
  commentText: string;
  successMessage = 'Comment posted';
  failedMessage = 'Empty comment';
  action = 'Hide';

  comments: MyComment[];

  constructor(private commentService: CommentService,
              public snackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getTopLevelComments();
  }

  getTopLevelComments() {
    this.commentService.getTopComments(this.id).subscribe(comments => this.comments = comments);
  }

  addTopLevelComment(userId: number) {
    // if (this.authService)
    console.log(userId);
    const newComment = new MyComment();
    if (this.commentText) {
      newComment.commentText = this.commentText;
      let params = new HttpParams();
      params = params.set('transitId', this.id.toString());
      params = params.set('userId', userId.toString());
      this.commentService.addComment(params, newComment)
        .subscribe(comment => console.log(comment));
      this.openSnackBar(this.successMessage);
    } else {
      this.openSnackBar(this.failedMessage);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }
}

