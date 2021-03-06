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

  selectedFiles: FileList;

  comments: MyComment[];

  constructor(private commentService: CommentService,
              public snackBar: MatSnackBar,
              private authService: CustomAuthService) {
  }

  ngOnInit() {
    this.getTopLevelComments();
  }

  getTopLevelComments() {
    this.commentService.getTopComments(this.id).subscribe(comments => {
      this.comments = comments;
    });
  }

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
            if (this.selectedFiles !== undefined) {
              this.uploadPics(comment);
            }
            this.getTopLevelComments();
          });
        this.addCommentText = undefined;
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
      this.comments.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
    }
    if (this.sortMode === 'ASC') {
      this.comments.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
    }
  }

  openChooseDialog(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }

    console.log(this.selectedFiles);
  }

  uploadPics(comment: MyComment) {
    const uploadedImageURLs: string[] = [];
    const subDir = `subDir=transitId${comment.transitId}/commentId${comment.id}`;

    console.log(this.selectedFiles);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log('state ' + i + ', ' + this.selectedFiles.item(i).name);
      this.commentService.uploadFile(this.selectedFiles.item(i), subDir).subscribe(res => {
        uploadedImageURLs.push(res);

        if (uploadedImageURLs.length === this.selectedFiles.length) {
          this.commentService.addImagesToComment(comment.id, JSON.stringify(uploadedImageURLs)).subscribe(res1 => {
            console.log(res1);
            this.getTopLevelComments();
          });
        }
      });
    }

  }
}

