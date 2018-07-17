import {Stop} from './stop.model';
import {Question} from './question.model';

export class Questioner {
  criteriaId: number;
  type: String;
  questions: Question[];
  answer: any;
  timeQuestions: Question[];
  routeQuestions: Question[];

  getPriority(): number {
    let priority = 0;
    for (let i = 0; i < this.questions.length; i++) {
      priority = priority + this.questions[i].priority;
    }
    return priority;
  }
}

export class Feedback {
  userId: number;
  transitId: number;
  criteriaId: number;
  type: String;
  answer: any;
}

export class RatingAnswer {
  answer: number;
  weight: number;
}

export class SimpleAnswer {
  answer: string;

}

export class CapacityHoursFeedback {
  capacity: number;
  startTime: Time;
  endTime: Time;

}

export class CapacityRouteFeedback {
  from: Stop;
  to: Stop;
  capacity: number;

}

export class Time {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }
}
