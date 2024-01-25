import { Vec2 } from './util';

export namespace NUIComms {
  export type Event = {
    pos: Vec2;
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
