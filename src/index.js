import axios from 'axios';
import flatten from 'flatten';

import Auth from './auth';

export default class MyTeepi {
  constructor(username, password) {
    this.auth = new Auth(username, password);
  }

  async get(url, params = {}) {
    const { access_token: accessToken, token_type: tokenType } = await this.auth.getAuthorization();
    const { data } = await axios.get(url, {
      params,
      headers: { Authorization: `${tokenType} ${accessToken}` },
    });
    return data;
  }

  async getDevices() {
    return this.get('https://api.ingeniousthings.fr/myteepi/api/devices');
  }

  async getDevice(id) {
    return this.get(`https://api.ingeniousthings.fr/myteepi/api/devices/${id}`);
  }

  async getEventTypes() {
    return this.get('https://api.ingeniousthings.fr/myteepi/api/event-types');
  }

  async getMeasuresByDevice(id, measure, params = {}) {
    return this.get(`https://api.ingeniousthings.fr/myteepi/api/devices/${id}/${measure}`, params);
  }

  async getTemperaturesByDevice(id, params = {}) {
    return this.getMeasuresByDevice(id, 'temperatures', params);
  }

  async getHygrometriesByDevice(id, params = {}) {
    return this.getMeasuresByDevice(id, 'hygrometries', params);
  }

  async getEventsByDevice(id, params = {}) {
    return this.getMeasuresByDevice(id, 'events', params);
  }

  async getPresencesByDevice(id, params = {}) {
    return this.getMeasuresByDevice(id, 'presences', params);
  }

  async combineMeasures(measureFunction, params) {
    const devices = await this.getDevices();
    const promises = devices.map(device => measureFunction(device.id, params));
    const measures = await Promise.all(promises);
    return flatten(measures);
  }

  async getTemperatures(params = {}) {
    return this.combineMeasures(id => this.getTemperaturesByDevice(id, params), params);
  }

  async getHygrometries(params = {}) {
    return this.combineMeasures(id => this.getHygrometriesByDevice(id, params), params);
  }

  async getEvents(params = {}) {
    return this.combineMeasures(id => this.getEventsByDevice(id, params), params);
  }

  async getPresences(params = {}) {
    return this.combineMeasures(id => this.getPresencesByDevice(id, params), params);
  }
}
