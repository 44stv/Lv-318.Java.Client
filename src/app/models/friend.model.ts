export class Friend {

  friendName: string;
  friendEmail: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
