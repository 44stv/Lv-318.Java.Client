import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment/moment';
import {Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material';
import {HttpParams} from '@angular/common/http';

import {
  SimpleAnswer,
  Feedback,
  Questioner,
  RatingAnswer,
  CapacityRouteFeedback,
  CapacityHoursFeedback,
  Time
} from '../../../../../../../models/feedback.model';
import {FeedbackService} from '../../../../../../../services/feedback.service';
import {StopService} from '../../../../../../../services/stop.service';
import {FeedbackCriteriaService} from '../../../../../../../services/feedback-criteria.service';
import {FeedbackCriteria} from '../../../../../../../models/feedback-criteria.model';
import {Question} from '../../../../../../../models/question.model';
import {Stop} from '../../../../../../../models/stop.model';
import {MyComment} from '../../../../../../../models/comment.model';
import {CommentService} from '../../../../../../../services/comment.service';
import { AuthService } from '../../../../../../../services/auth/auth.service';



@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  @Input() survey: Questioner[] = [];
  @Input() qualitySurvey: Questioner[] = [];
  @Input() capacitySurvey: Questioner[] = [];
  @Input() capacity = 0;
  @Input() transitId: number = this.data.number;
  @Input() transitName: String = this.data.transitName;
  @Input() private transitComment: MyComment = new MyComment();
  private stops: Observable<Stop[]>;
  private categoryId: number = this.data.categoryId;
  private userId = 1;
  private checkBoxAnswers: String[] = ['YES', 'NO', 'MAYBE'];
  private quantityLoadAnswers: String[] = ['SIT', 'STAY', 'HARD_LOAD', 'LOSER']; 
  successMessage = 'Feedback and Comment posted';
  failedMessage = 'Empty feedback';
  loginMessage = 'Please, log in';
  action = 'Hide';
  // private directions: String[] = ['FORWARD', 'BACKWARD'];
  // private direction: String;

  constructor(private dialogRef: MatDialogRef<AddFeedbackComponent>, @ Inject(MAT_DIALOG_DATA) public data: any,
              private feedbackService: FeedbackService, private criteriaService: FeedbackCriteriaService,
              private stopService: StopService,
              private commentService: CommentService,
              public snackBar: MatSnackBar,
            public auth: AuthService) {

    this.survey = this.buildSurveyByCriteriaType(['RATING']);
    this.qualitySurvey = this.buildSurveyByCriteriaType(['SIMPLE', 'QUALITY'])
    this.capacitySurvey = this.buildSurveyByCriteriaType(['ROUTE_CAPACITY', 'HOURS_CAPACITY']);
    this.stops = this.stopService.getStopsByTransitId(this.transitId);
    // this.stops= this.stopService.getStopsByTransitIdAndDirection(this.transitId,this.direction);

  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

  public saveAllFeedback(): void {
    const feedbacks: Feedback[] = this.toFeedbackList(this.survey);
    const capFeedbacks: Feedback[] = this.toFeedbackList(this.capacitySurvey);
    const quantityFeedbacks: Feedback[] = this.toFeedbackList(this.qualitySurvey);
    console.log(feedbacks.concat(capFeedbacks, quantityFeedbacks));
    // if (this.transitComment.commentText) {
    //   this.addComment();
    // }
    if (feedbacks.concat(capFeedbacks, quantityFeedbacks).length > 0 || this.transitComment.commentText) {
      this.feedbackService.saveAllFeedback(feedbacks.concat(capFeedbacks)).subscribe();
      this.addComment();
      this.openSnackBar(this.successMessage);
    } else {
      this.openSnackBar(this.failedMessage);
    }
    this.dialogRef.close();
  }

  public buildSurveyByCriteriaType(types: String []): Questioner[] {
    const survey: Questioner[] = [];
    types.forEach(type => {
      this.criteriaService.getAllFeedbackCriteriaByTypeAndCategoryId(this.categoryId, type)
        .subscribe(feedbackCriterias => {
          feedbackCriterias.forEach(criteria => {
            const questioner: Questioner = this.buildQuestioner(criteria, criteria.questions);
            questioner.questions.sort((a: Question, b: Question) => {
              return b.priority - a.priority;
            });
            survey.push(questioner);
          });
        });
    });
    return survey;
  }

  public buildQuestioner(criteria: FeedbackCriteria, questions: Question[]): Questioner {
    const questioner: Questioner = new Questioner();
    questioner.criteriaId = criteria.id;
    questioner.type = criteria.type;
    questioner.questions = questions;
    questioner.routeQuestions = this.getQuestionsByType(questioner, 'STOP');
    questioner.timeQuestions = this.getQuestionsByType(questioner, 'TIME');

    this.buildAnswerModel(questioner, criteria);
    return questioner;
  }

  public buildAnswerModel(questioner: Questioner, criteria: FeedbackCriteria) {
    switch (questioner.type) {
      case 'RATING' :
        questioner.answer = new Array<number>(criteria.questions.length);
        break;
      case 'SIMPLE' :
        questioner.answer = new SimpleAnswer();
        break;
      case 'QUALITY' :
        questioner.answer = new SimpleAnswer();
        break;
      case 'ROUTE_CAPACITY' :
        questioner.answer = new Array<Stop>(questioner.routeQuestions.length);
        break;
      case 'HOURS_CAPACITY' :
        questioner.answer = new Array<String>(questioner.timeQuestions.length);
        break;
    }

  }


  public toFeedbackList(survey: Questioner[]): Feedback[] {
    const feedbacks: Feedback[] = [];
    survey.forEach(questioner => {
      const feedback: Feedback = new Feedback();
      feedback.transitId = this.transitId;
      feedback.userId = this.auth.getUserId();
      feedback.criteriaId = questioner.criteriaId;
      feedback.type = questioner.type;
      feedback.answer = this.answerFormatter(questioner);
      if (feedback.answer && feedback.answer.length > 0) {
        feedbacks.push(feedback);
      }
    });
    return feedbacks;
  }

  public answerFormatter(questioner: Questioner): string {
    switch (questioner.type) {
      case 'RATING' :
        return this.buildRatingAnswer(questioner);
      case 'SIMPLE' :
        return this.buildSimpleAnswer(questioner);
      case 'QUALITY' :
        return this.buildSimpleAnswer(questioner);
      case 'ROUTE_CAPACITY' :
        return this.buildCapacityRouteAnswer(questioner);
      case 'HOURS_CAPACITY' :
        return this.buildCapacityHoursAnswer(questioner);
    }
  }

  public buildSimpleAnswer(questioner: Questioner): string {
    const answer: string = questioner.answer;
    if (answer && answer.length > 0) {
      return `"${answer}"`;
    } else {
      return '';
    }
  }


  public buildRatingAnswer(questioner: Questioner): string {
    const rates: RatingAnswer[] = [];
    for (let i = 0; i < questioner.answer.length; i++) {
      const ratingAnswer: RatingAnswer = new RatingAnswer();
      ratingAnswer.answer = questioner.answer[i];
      ratingAnswer.weight = questioner.questions[i].weight;
      if (ratingAnswer.answer) {
        rates.push(ratingAnswer);
      }
    }
    if (rates.length > 0) {
      return JSON.stringify(rates);
    } else {
      return '';
    }
  }

  public buildCapacityRouteAnswer(questioner: Questioner): string {
    const capacityRouteFeedback: CapacityRouteFeedback = new CapacityRouteFeedback();
    if (questioner.answer && questioner.answer.length > 1) {
      capacityRouteFeedback.from = questioner.answer[0];
      capacityRouteFeedback.to = questioner.answer[1];
      capacityRouteFeedback.capacity = this.checkCapacityValue(this.capacity);
    }
    if (capacityRouteFeedback.from && capacityRouteFeedback.to) {
      return JSON.stringify(capacityRouteFeedback);
    } else {
      return '';
    }
  }

  public checkCapacityValue(capacity: number): number {
    capacity = (capacity > 100) ? 100 : capacity;
    capacity = (capacity < 0) ? 0 : capacity;
    return capacity;
  }

  public buildCapacityHoursAnswer(questioner: Questioner): string {
    const capacityHourAnswer: CapacityHoursFeedback = new CapacityHoursFeedback();
    const times: Time[] = [];
    for (let i = 0; i < questioner.answer.length; i++) {
      const time: Time = new Time(moment(questioner.answer[i], 'HH:mm').hour(), moment(questioner.answer[i], 'HH:mm').minute());
      if (time.hour && time.minute) {
        times.push(time);
      }
    }

// TODO:new sorting
    if (times.length > 1) {
      times.sort((time1: Time, time2: Time) => {
        if (time1.hour > time2.hour) {
          return 1;
        } else if (time1.hour < time2.hour) {
          return -1;
        } else if (time1.minute > time2.minute) {
          return 1;
        } else if (time1.minute > time2.minute) {
          return -1;
        }
        return 0;
      });

      capacityHourAnswer.startTime = times[0];
      capacityHourAnswer.endTime = times[times.length - 1];
      capacityHourAnswer.capacity = this.checkCapacityValue(this.capacity);
    }
    if (capacityHourAnswer.startTime && capacityHourAnswer.endTime) {
      return JSON.stringify(capacityHourAnswer);
    } else {
      return '';
    }
  }

  public getQuestionsByType(questioner: Questioner, type: String): Question[] {
    const questions: Question[] = [];
    questioner.questions.forEach(question => {
      if (question.type === type) {
        questions.push(question);
      }
    });
    return questions;
  }

  public addComment() {
    let params = new HttpParams();
    params = params.set('transitId', this.transitId.toString());
    params = params.set('userId', this.userId.toString());
    this.commentService.addComment(params, this.transitComment)
      .subscribe(comment => console.log(comment));
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }
  // public getByTransitAndDirection(direction: String){
  //   this.stops =this.stopService.getStopsByTransitIdAndDirection(this.transitId,direction);
  // }
}

