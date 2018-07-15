export class UserInfoModel {

  firstName: string;
  lastName: string;
  email: string;
  role: string;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
