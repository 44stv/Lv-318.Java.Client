import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import * as moment from 'moment/moment';
import {HttpParams} from '@angular/common/http';

import {
  CapacityHoursFeedback,
  CapacityRouteFeedback,
  Feedback,
  Questioner,
  RatingAnswer,
  SimpleAnswer,
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
import {CustomAuthService} from '../../../../../../../services/auth/custom-auth.service';


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
  @Input() transitComment: MyComment = new MyComment();
  @Input() direction: String;
  @Input() transitId: number = this.data.number;
  @Input() transitName: String = this.data.transitName;
  @Input() feedbackFromMaps: boolean = (this.data.fromMaps) ? this.data.fromMaps : false;
  @Input() imageAnswer: String = '';
  @Input() haveConflicts: boolean;
  @Input() conflicts: String[] = [];
  private categoryId: number = this.data.categoryId;

  private forwardStops: Stop [] = [];
  private backwardStops: Stop [] = [];
  private checkBoxAnswers: String[] = ['YES', 'NO', 'MAYBE'];
  successMessage = 'Feedback and Comment posted';
  failedMessage = 'Empty feedback';
  action = 'Hide';
  private directions: String[] = ['FORWARD', 'BACKWARD'];


  constructor(private dialogRef: MatDialogRef<AddFeedbackComponent>, @ Inject(MAT_DIALOG_DATA) public data: any,
              private feedbackService: FeedbackService, private criteriaService: FeedbackCriteriaService,
              private stopService: StopService,
              private commentService: CommentService,
              public snackBar: MatSnackBar,
              public auth: CustomAuthService) {

    this.survey = this.buildSurveyByCriteriaType(['RATING']);
    this.qualitySurvey = this.buildSurveyByCriteriaType(['SIMPLE', 'QUANTITY_LOAD', 'CONFLICT']);
    this.capacitySurvey = this.buildSurveyByCriteriaType(['ROUTE_CAPACITY', 'HOURS_CAPACITY']);
    this.forwardStops = this.getByTransitAndDirection('FORWARD');
    this.backwardStops = this.getByTransitAndDirection('BACKWARD');
    this.direction = this.getDirection();
    this.getStopsAnswerModel();


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
    if (feedbacks.concat(capFeedbacks, quantityFeedbacks).length > 0 && this.transitComment.commentText) {
      this.feedbackService.saveAllFeedback(feedbacks.concat(capFeedbacks, quantityFeedbacks)).subscribe();
      this.addComment();
      this.openSnackBar(this.successMessage);
      this.dialogRef.close();
    } else if (this.transitComment.commentText) {
      this.addComment();
      this.openSnackBar('Comment posted');
      this.dialogRef.close();
    } else if (feedbacks.concat(capFeedbacks, quantityFeedbacks).length > 0) {
      this.feedbackService.saveAllFeedback(feedbacks.concat(capFeedbacks, quantityFeedbacks)).subscribe();
      this.openSnackBar('Feedback posted');
      this.dialogRef.close();
    } else {
      this.openSnackBar(this.failedMessage);
      this.dialogRef.close();
    }
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
            survey.sort(this.sortQuestioner);
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
      case 'QUANTITY_LOAD' :
        questioner.answer = new SimpleAnswer();
        break;
      case 'ROUTE_CAPACITY' :
        questioner.answer = (this.data.fromStopId && this.data.toStopId) ? this.getStopsAnswerModel() :
          new Array<Stop>(questioner.routeQuestions.length);
        break;
      case 'HOURS_CAPACITY' :
        questioner.answer = new Array<String>(questioner.timeQuestions.length);
        break;
      case 'CONFLICT' :
        questioner.answer = new SimpleAnswer();
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
      case 'QUANTITY_LOAD' :
        return this.buildSimpleAnswer(questioner);
      case 'ROUTE_CAPACITY' :
        return this.buildCapacityRouteAnswer(questioner);
      case 'HOURS_CAPACITY' :
        return this.buildCapacityHoursAnswer(questioner);
      case 'CONFLICT' :
        return this.buildConflictFeedbackAnswer();
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

  public buildConflictFeedbackAnswer(): string {
    let conflicts: String[] = [];
    if (this.conflicts && this.conflicts.length > 0) {
      return JSON.stringify(this.conflicts);
    } else if (this.haveConflicts === false) {
      conflicts.push('NO_CONFLICT');
      return JSON.stringify(conflicts);
    }
    return '';
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
    params = params.set('userId', this.auth.getUserId().toString());
    this.commentService.addComment(params, this.transitComment)
      .subscribe(comment => console.log(comment));
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, this.action, {
      duration: 2000,
    });
  }

  public getStopsAnswerModel(): Stop[] {
    const defaultStops: Stop[] = [];
    this.stopService.getStopsByTransitIdAndDirection(this.transitId, this.direction).subscribe(stops => {
      stops.forEach(stop => {
          if (stop.id === this.data.fromStopId || stop.id === this.data.toStopId) {
            defaultStops.push(stop);
          }
        }
      );
    });
    return defaultStops;
  }

  public compareStop(c1: Stop, c2: Stop): boolean {
    return (c1 && c2) ? c1.street === c2.street : c1 === c2;
  }

  public getTransitStops(): Stop[] {
    const stops: Stop[] = [];
    this.stopService.getStopsByTransitId(this.transitId).subscribe(data => {
      data.forEach(stop => stops.push(stop));
    });
    return stops;
  }

  public getByTransitAndDirection(direction: String) {
    const stops: Stop[] = [];
    this.stopService.getStopsByTransitIdAndDirection(this.transitId, direction).subscribe(data => {
      data.forEach(stop => {
        stops.push(stop);
      });
    });
    return stops;
  }

  public getDirection(): String {
    let direction: String;
    if (this.data.direction) {
      direction = this.data.direction.toUpperCase();
    }
    return direction;
  }

  public isSelectedConflict(conflict: String) {
    this.conflicts.push(conflict);
  }

  public sortQuestioner(questioner1: Questioner, questioner2: Questioner): number {
    return questioner1.getPriority() - questioner2.getPriority();
  }
}

