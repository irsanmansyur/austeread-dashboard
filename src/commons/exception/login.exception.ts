export default class LoginException extends Error {
  constructor(public errors: string[]) {
    super("Login Errors");
  }
}
