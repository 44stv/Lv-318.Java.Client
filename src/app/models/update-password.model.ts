export class UpdatePassword {
      oldPassword: string;
      newPassword: string;
      passwordConfirmation: string;

      constructor(values: Object = {}) {
        Object.assign(this, values);
      }
    }
