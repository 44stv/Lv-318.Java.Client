import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment/moment';

import {
  AccepterAnswer,
  Feedback,
  Questioner,
  RatingAnswer,
  CapacityRouteFeedback,
  CapacityHoursFeedback,
  Time
} from '../../../../../../../models/feedback.model';
import {FeedbackService} from '../../../../../../../services/feedback.service';
import {FeedbackCriteriaService} from '../../../../../../../services/feedback-criteria.service';
import {FeedbackCriteria} from '../../../../../../../models/feedback-criteria.model';
import {Question} from '../../../../../../../models/question.model';
import {Stop} from '../../../../../../../models/stop.model';


@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  @Input() survey: Questioner[] = [];
  @Input() capacityFeedbacks: Questioner[] = [];
  @Input() capacity = 0;
  @Input() transitId: number = this.data.number;
  @Input() transitName: String = this.data.transitName;
  private categoryId: number = this.data.categoryId;
  private userId = 1;
  private checkBoxAnswers: String[] = ['YES', 'NO', 'MAYBE'];

  constructor(private dialogRef: MatDialogRef<AddFeedbackComponent>, @ Inject(MAT_DIALOG_DATA) public data: any,
              private feedbackService: FeedbackService, private criteriaService: FeedbackCriteriaService) {
    this.survey = this.buildSurveyByCriteriaType(['RATING', 'ACCEPTER']);
    this.capacityFeedbacks = this.buildSurveyByCriteriaType(['ROUTE_CAPACITY', 'HOURS_CAPACITY']);

  }

  ngOnInit() {
    console.log(this.survey);
    console.log(this.capacityFeedbacks);

  }

  public buildSurveyByCriteriaType(types: String []): Questioner[] {
    const survey: Questioner[] = [];
    types.forEach(type => {
      this.criteriaService.getAllFeedbackCriteriaByTypeAndCategoryId(this.categoryId, type)
        .subscribe(feedbackCriterias => {
          feedbackCriterias.forEach(criteria => {
            const questioner: Questioner = this.buildQuestioner(criteria, criteria.questions);
            questioner.questions.sort((a: Question, b: Question) => {
              if (a.name > b.name) return 1;
              else if (a.name < b.name) return -1;
              return 0;
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
    questioner.routeQuestions = this.getQuestionsByType(questioner, 'ROUTE');
    questioner.timeQuestions = this.getQuestionsByType(questioner, 'TIME');

    this.buildAnswerModel(questioner, criteria);
    return questioner;
  }

  public buildAnswerModel(questioner: Questioner, criteria: FeedbackCriteria) {
    switch (questioner.type) {
      case 'RATING' :
        questioner.answer = new Array<number>(criteria.questions.length);
        break;
      case 'ACCEPTER' :
        questioner.answer = new AccepterAnswer();
        break;
      case 'ROUTE_CAPACITY' :
        questioner.answer = new Array<Stop>(questioner.routeQuestions.length);
        break;
      case 'HOURS_CAPACITY' :
        questioner.answer = new Array<String>(questioner.timeQuestions.length);
        break;
    }

  }

  public close() {
    this.dialogRef.close();
  }

  public saveAllFeedback(): void {
    const feedbacks: Feedback[] = this.toFeedbackList(this.survey);
    const capFeedbacks: Feedback[] = this.toFeedbackList(this.capacityFeedbacks);
    console.log(feedbacks.concat(capFeedbacks));
    console.log(capFeedbacks);
    // this.feedbackService.saveAllFeedback(feedbacks.concat(capFeedbacks)).subscribe(data => {
    //   alert('Feedback created successfully.');
    // });

    this.dialogRef.close();
  }


  public toFeedbackList(survey: Questioner[]): Feedback[] {
    const feedbacks: Feedback[] = [];
    survey.forEach(questioner => {
      const feedback: Feedback = new Feedback();
      feedback.transitId = this.transitId;
      feedback.userId = this.userId;
      feedback.criteriaId = questioner.criteriaId;
      feedback.type = questioner.type;
      feedback.answer = this.answerFormatter(questioner);
      // TODO: check to empty answer
      if (questioner.answer && questioner.answer.length > 0) {
        feedbacks.push(feedback);
      }
    });
    return feedbacks;
  }

  public answerFormatter(questioner: Questioner): string {
    switch (questioner.type) {
      case 'RATING' :
        return this.buildRatingAnswer(questioner);
      case 'ACCEPTER' :
        return `"${questioner.answer}"`;
      case 'ROUTE_CAPACITY' :
        return this.buildCapacityRouteAnswer(questioner);
      case 'HOURS_CAPACITY' :
        return this.buildCapacityHoursAnswer(questioner);
    }
  }

  public buildRatingAnswer(questioner: Questioner): string {
    const rates: RatingAnswer[] = [];
    for (let i = 0; i < questioner.answer.length; i++) {
      const ratingAnswer: RatingAnswer = new RatingAnswer();
      ratingAnswer.answer = questioner.answer[i];
      ratingAnswer.weight = questioner.questions[i].weight;
      rates.push(ratingAnswer);
    }
    return JSON.stringify(rates);
  }

  public buildCapacityRouteAnswer(questioner: Questioner): string {
    const capacityRouteFeedback: CapacityRouteFeedback = new CapacityRouteFeedback();
    if (questioner.answer.stops && questioner.answer.stops > 1) {
      capacityRouteFeedback.from = questioner.answer.stops[0];
      capacityRouteFeedback.to = questioner.answer.stops[1];
      capacityRouteFeedback.capacity = this.checkCapacityValue(this.capacity);
    }

    return JSON.stringify(capacityRouteFeedback);
  }

  public buildCapacityHoursAnswer(questioner: Questioner): string {
    let capacityHourAnswer: CapacityHoursFeedback = new CapacityHoursFeedback();
    const times: Time[] = [];
    for (let i = 0; i < questioner.answer.length; i++) {
      if (this.isNull(moment(questioner.answer[i], 'HH:mm').hour()) || this.isNull(moment(questioner.answer[i], 'HH:mm').minute())) {

      } else {
        const time: Time = new Time(moment(questioner.answer[i], 'HH:mm').hour(), moment(questioner.answer[i], 'HH:mm').minute());
        times.push(time);
      }
    }
    times.sort((time1: Time, time2: Time) => {
      if (time1.hour > time2.hour) return 1;
      else if (time1.hour < time2.hour) return -1;
      else if (time1.minute > time2.minute) return 1;
      else if (time1.minute > time2.minute) return -1;
      return 0;
    });

    capacityHourAnswer.startTime = times[0];
    capacityHourAnswer.endTime = times[times.length - 1];
    capacityHourAnswer.capacity = this.checkCapacityValue(this.capacity);
    console.log(JSON.stringify(times));
    console.log(JSON.stringify(capacityHourAnswer));
    return JSON.stringify(capacityHourAnswer);
  }

  public isNull(value: any): value is null {
    return value === null;
  }

  public checkCapacityValue(capacity: number): number {
    capacity = (capacity > 100) ? 100 : capacity;
    capacity = (capacity < 0) ? 0 : capacity;
    return capacity;
  }

  public getCountQuestionsByType(questioner: Questioner, type: String): number {
    let count = 0;
    questioner.questions.forEach(question => {
      if (question.type === type) {
        count++;
      }
    })
    return count;
  }

  public getQuestionsByType(questioner: Questioner, type: String): Question[] {
    const questions: Question[] = [];
    questioner.questions.forEach(question => {
      if (question.type === type) {
        questions.push(question);
      }
    })
    return questions;
  }
}

