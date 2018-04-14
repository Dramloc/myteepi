declare namespace myteepi {
  type ISO8601Date = string;
  type DeviceId = string;
  type EventId = string;
  type PresenceId = string;
  type EventType = string;

  interface Temperature {
    day: ISO8601Date;
    value: number;
  }

  interface Hygrometry {
    day: ISO8601Date;
    value: number;
  }

  interface Event {
    id: EventId;
    device: DeviceId;
    timestamp: ISO8601Date;
    type: {
      name: EventType;
    };
  }

  interface Presence {
    id: PresenceId;
    device: DeviceId;
    from: ISO8601Date;
    to: ISO8601Date;
  }

  interface Device {
    id: DeviceId;
    activationDate: ISO8601Date;
    lastUpdate: ISO8601Date;
    nbMessages: number;
    nbPlugged: number;
    nbAlerts: number;
    soundAlarm: boolean;
    powerAlarm: boolean;
    plugged: boolean;
    hygrometry: number;
    soundLevel: number;
    battery: number;
    temperature: number;
    externalTemperature: number;
    presence: boolean;
    powerCut: boolean;
  }

  interface ApiParams {
    page: number;
    size: number;
    from: ISO8601Date;
    to: ISO8601Date;
    sort: string;
  }

  export class MyTeepi {
    constructor(username: string, password: string);
    getDevices(): Promise<Device[]>;
    getDevice(id: DeviceId): Promise<Device>;
    getEventTypes(): Promise<EventType[]>;
    getTemperaturesByDevice(id: DeviceId, params?: ApiParams): Promise<Temperature[]>;
    getHygrometriesByDevice(id: DeviceId, params?: ApiParams): Promise<Hygrometry[]>;
    getEventsByDevice(id: DeviceId, params?: ApiParams): Promise<Event[]>;
    getPresencesByDevice(id: DeviceId, params?: ApiParams): Promise<Presence[]>;
    getTemperatures(params?: ApiParams): Promise<Temperature[]>;
    getHygrometries(params?: ApiParams): Promise<Hygrometry[]>;
    getEvents(params?: ApiParams): Promise<Event[]>;
    getPresences(params?: ApiParams): Promise<Presence[]>;
  }
}

export = myteepi.MyTeepi;
