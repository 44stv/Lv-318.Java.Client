import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { FeedbackCriteriaService } from '../../../../services/feedback-criteria.service';
import { FeedbackCriteria } from '../../../../models/feedback-criteria.model';
import { filter } from 'rxjs/operators';
import { Question } from '../../../../models/question.model';

@Component({
  selector: 'app-feedback-criteria',
  templateUrl: './feedback-criteria.component.html',
  styleUrls: ['./feedback-criteria.component.css']
})
export class FeedbackCriteriaComponent implements OnInit {

  feedbackCriterias: FeedbackCriteria[];
  displayedColumns = ['type', 'questions', 'weight', 'questionType'];
  dataSource = new MatTableDataSource<FeedbackCriteria>();
  data: FeedbackCriteria[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private feedbackCriteriaService: FeedbackCriteriaService) {
  }

  ngOnInit() {
    this.getAllFeedbackCriteria();
  }

  getAllFeedbackCriteria(): void {
    this.feedbackCriteriaService.getAllFeedbackCriteria()
      .subscribe(feedbackCriterias => {
        this.dataSource.data = feedbackCriterias;
        this.data = feedbackCriterias;
      });
    this.dataSource.paginator = this.paginator;
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.dataSource.data = this.data.filter(criteria => this.containsIgnoringCase(criteria.type, searchTerm)
        || criteria.questions.reduce((accumulatedResult, question) => accumulatedResult
          || this.containsIgnoringCase(question.name, searchTerm), false)
        || criteria.questions.reduce((accumulatedResult, question) => accumulatedResult
          || this.containsIgnoringCase(question.weight, searchTerm), false)
        || criteria.questions.reduce((accumulatedResult, question) => accumulatedResult
          || this.containsIgnoringCase(question.type, searchTerm), false)
      );
    } else {
      this.dataSource.data = this.data;
    }
  }

  private containsIgnoringCase(first: any, second: any): boolean {
    return first && second && first.toString().trim().toLowerCase().indexOf(second.toString().trim().toLowerCase()) >= 0;
  }
}
