import {Stop} from './stop.model';

export class Questioner {
  // userId: number;
  // transitId: number;
  criteriaId: number;
  type: String;
  questions: String[];
  answer: any;
}

export class Feedback {
  userId: number;
  transitId: number;
  criteriaId: number;
  type: String;
  answer: any;
  date:String;
}

export class RatingAnswer {
  answer: number;
  weight: number;
}
export class RatingAnswerArray{
 answer: number[]=[];

 constructor(lenght:number){
   this.answer.length=lenght;
 }
}
export class Answer {
  value: string;
}
export class AccepterAnswer{
  answer: string;
  toString(): string{
    return `"${this.answer}"`;
  }
}
export class CapacityAnswer {
  from: Stop;
  to: Stop;
  capacity: number;
  startTime: Time;
  endTime: Time;

  toCapacityHoursString(): string {
    return this.startTime.toString() + this.endTime.toString() + this.capacity.toString();
  }

  toCapacityRouteString(): string {
    return this.from.toString() + this.endTime.toString() + this.capacity.toString();
  }
}

export class Time {
  hour: number;
  minute: number;
}
