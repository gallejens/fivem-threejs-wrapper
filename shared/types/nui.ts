// Game -> NUI Event
type NUIEventWrapper<T extends Record<string, unknown>> = T;

export type NUIEvent = {
  test: NUIEventWrapper<{ name: string }>;
};

// NUI -> Game Request

type ObjOrNull = Record<string, unknown> | null;

type NUIRequestWrapper<Data extends ObjOrNull, Response extends ObjOrNull> = {
  data: Data;
  response: Response;
};

export type NUIRequest = {
  ready: NUIRequestWrapper<null, null>;
};

export type NUIResponse<T extends keyof NUIRequest> = {
  data: NUIRequest[T]['response'];
  meta:
    | {
        ok: true;
      }
    | {
        ok: false;
        message: string;
      };
};
