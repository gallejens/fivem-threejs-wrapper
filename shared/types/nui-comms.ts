import { Vec3 } from './util';

export namespace NUIComms {
  export type Event = {
    coords: Vec3;
    heading: number;
    request: number;
  };

  export type EventBody = {
    [K in keyof Event]: {
      action: K;
      data: Event[K];
    };
  }[keyof Event];

  // NUI -> Game Request
  type RequestWrapper<Data = any, Response = any> = {
    data: Data;
    response: Response;
  };

  export type Request = {
    ready: RequestWrapper<null, null>;
    request: RequestWrapper<number, boolean>;
  };

  export type Response<T extends keyof Request> = {
    data: Request[T]['response'];
    meta:
      | {
          ok: true;
        }
      | {
          ok: false;
          message: string;
        };
  };
}
