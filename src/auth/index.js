import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

export default class Auth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.authorization = undefined;
    this.expiresAt = undefined;
  }

  async authorize() {
    const form = new FormData();
    form.append('grant_type', 'password');
    form.append('username', this.username);
    form.append('password', this.password);
    const response = await fetch('https://api.ingeniousthings.fr/accounts/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic d2ViX2FwcDo=',
      },
      body: form,
    });
    const authorization = await response.json();
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
