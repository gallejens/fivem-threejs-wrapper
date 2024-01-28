import { Vec3 } from './util';

export namespace NUIComms {
  export type Event = {
    update: {
      camera: {
        position: Vec3;
        rotation: Vec3;
        meta?: {
          fov: number;
          near: number;
          far: number;
        };
      };
    };
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
