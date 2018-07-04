import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Questioner, Feedback, AccepterAnswer, RatingAnswer, CapacityAnswer ,RatingAnswerArray} from '../../../../models/feedback.model';
import { FeedbackService } from '../../../../services/feedback.service';
import { FeedbackCriteriaService } from '../../../../services/feedback-criteria.service';
import { FeedbackCriteria } from '../../../../models/feedback-criteria.model';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  @Input() transitName: String = this.data.transitName;
  @Input() survey: Questioner[] = [];
  @Input() capacityFeedbacks: Questioner[];
  @Input() transitId: number = this.data.number;
  @Input() CapacityAnswer = new CapacityAnswer();
  private categoryId: number = this.data.categoryId;
  private userId: number = 1;
  private questionsDatas: String[];
  private checkBoxAnswers: String[] = ['YES', 'NO', 'MAYBE'];
  

  constructor(private dialogRef: MatDialogRef<AddFeedbackComponent>, @ Inject(MAT_DIALOG_DATA) public data: any,
              private feedbackService: FeedbackService, private criteriaService: FeedbackCriteriaService) {
    this.survey = this.buildSurveyByCriteriaType(['RATING', 'ACCEPTER']);
    this.capacityFeedbacks = this.buildSurveyByCriteriaType(['ROUTE_CAPACITY', 'HOURS_CAPACITY']);

  }
     ngOnInit(){
       
    console.log(this.survey) ;
   }
   public buildSurveyByCriteriaType(types: String []): Questioner[] {
    const survey: Questioner[] = [];
    types.forEach(type => {
      this.criteriaService.getAllFeedbackCriteriaByTypeAndCategoryId(this.categoryId, type)
        .subscribe(feedbackCriterias => {
          feedbackCriterias.forEach(criteria => {
            this.questionsDatas = criteria.questions.map(question => question.name);
            const questioner: Questioner = this.buildQuestioner(criteria, this.questionsDatas);
            survey.push(questioner);
          });
        });
    });
    return survey;
  }

  public buildQuestioner(criteria: FeedbackCriteria, questions: String[]): Questioner {
    const questioner: Questioner = new Questioner();
    questioner.criteriaId = criteria.id;
    questioner.type = criteria.type;
    questioner.questions = questions;
    this.buildAnswerModel(questioner,criteria);
    return questioner;
  }
  public  buildAnswerModel(questioner: Questioner,criteria : FeedbackCriteria){
    switch(questioner.type){
      case 'RATING' : 
      questioner.answer = new Array<number>(criteria.questions.length);
      break;
      case 'ACCEPTER' :
      questioner.answer = new AccepterAnswer();
      break;
      case 'ROUTE_CAPACITY' :
      questioner.answer = new CapacityAnswer();
      break;
      case 'HOURS_CAPACITY' :
      questioner.answer = new CapacityAnswer();
      break;
    }
  
  }
  public close() {
    this.dialogRef.close();
  }

  public saveAllFeedback(): void {
    const feedbacks: Feedback[] = this.toFeedbackList(this.survey);
    console.log(feedbacks);
    // this.feedbackService.saveAllFeedback(feedbacks).subscribe(data => {
    //   alert('Feedback created successfully.');
    // });

    this.dialogRef.close();
  }


  public toFeedbackList(survey: Questioner[]): Feedback[] {
    const feedbacks: Feedback[] = [];
    survey.forEach(questioner => {
      if (questioner.answer && questioner.answer.length > 0) {
        const feedback: Feedback = new Feedback();
        feedback.transitId = this.transitId;
        feedback.userId = this.userId;
        feedback.criteriaId = questioner.criteriaId;
        feedback.type = questioner.type;
        // feedback.date = Date.now().toLocaleString('uk-UA'); 
        feedback.answer = this.answerFormatter(questioner);
        
        feedbacks.push(feedback);
      }
    });
    return feedbacks;
  }

 public answerFormatter(questioner: Questioner):string{
  switch(questioner.type){
    case 'RATING' : 
    return this.buildRatingAnswer(questioner);
    case 'ACCEPTER' :
    return `"${questioner.answer}"`;
    case 'ROUTE_CAPACITY' :
    return questioner.answer.toString();
    case 'HOURS_CAPACITY' :
    return questioner.answer.toString();
  }
 }
  
 public buildRatingAnswer(questioner: Questioner): string{
   let rates : RatingAnswer[] =[];
for(let i:number =0;i< questioner.answer.length;i++){
  const ratingAnswer: RatingAnswer = new RatingAnswer();
  ratingAnswer.answer = questioner.answer[i];
  rates.push(ratingAnswer)
}
   return JSON.stringify(rates);
 }

}
