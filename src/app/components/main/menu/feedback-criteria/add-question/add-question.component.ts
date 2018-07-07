import { Component, OnInit, Input, Inject } from '@angular/core';
import { Question } from '../../../../../models/question.model';
import { FeedbackCriteriaService } from '../../../../../services/feedback-criteria.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input() question: Question = new Question();
  isReadOnly: boolean;
  enumTypeOfQuestions: any;

  constructor(private feedbackCriteriaService: FeedbackCriteriaService,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isReadOnly = data.isReadOnly;
  }

  ngOnInit() {
    this.getAllEnumTypesOfQuestion();
  }

  close(name: string, weight: number, type: string) {
    this.dialogRef.close();
  }

  add(name: string, weight: number, type: string) {
    if (!(name == null)) {
      this.dialogRef.close({ name, weight, type } as Question);
    }
  }
  getAllEnumTypesOfQuestion(): void {
    this.feedbackCriteriaService.getAllEnumTypesOfQuestion()
      .subscribe(enumTypeOfQuestion => {
        this.enumTypeOfQuestions = enumTypeOfQuestion;
      });
  }

}
