import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../../../../../../../services/comment.service';
import { CustomAuthService } from '../../../../../../../../../../services/auth/custom-auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() comment;

  rating: number;

  constructor(private commentService: CommentService,
              private authService: CustomAuthService) { }

  ngOnInit() {
    if (this.comment.rating !== undefined) {
      this.rating = this.comment.rating;
    }
  }

  like() {
    this.commentService.likeComment(this.comment.id, this.authService.getUserId()).subscribe(rating => {
      console.log(rating);
      this.rating++;
    });
  }

  dislike() {
    this.commentService.dislikeComment(this.comment.id, this.authService.getUserId()).subscribe(rating => {
      console.log(rating);
      this.rating--;
    });
  }

}
