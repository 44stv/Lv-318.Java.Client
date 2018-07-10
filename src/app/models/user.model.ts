export class User {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  provider: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
