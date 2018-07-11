export class Login {

  email: string;
  password: string;
  passwordConfirmation: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
