import { promisify } from 'util';
import request from 'request';

const http = promisify(request);

export default class Auth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.authorization = undefined;
    this.expiresAt = undefined;
  }

  async authorize() {
    const response = await http({
      method: 'POST',
      url: 'https://api.ingeniousthings.fr/accounts/oauth/token',
      headers: {
        Authorization: 'Basic d2ViX2FwcDo=',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      formData: {
        grant_type: 'password',
        username: this.username,
        password: this.password,
      },
    });
    const authorization = JSON.parse(response.body);
    this.authorization = authorization;
    const expiresIn = authorization.expires_in * 1000;
    this.expiresAt = Date.now() + expiresIn;
    return authorization;
  }

  async getAuthorization() {
    if (this.isAuthenticated()) {
      return this.authorization;
    }
    return this.authorize();
  }

  isAuthenticated() {
    if (this.authorization === undefined) {
      return false;
    }
    return Date.now() < this.expiresAt;
  }
}
