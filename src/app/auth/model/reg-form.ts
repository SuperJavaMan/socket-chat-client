export class RegForm {
  username: string;
  password: string;
  asAdmin: boolean;

  constructor(username: string, password: string, asAdmin: boolean) {
    this.username = username;
    this.password = password;
    this.asAdmin = asAdmin;
  }
}
