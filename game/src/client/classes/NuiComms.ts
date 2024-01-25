import { type NUIComms } from '../../../../shared/types/nui-comms';
import { Logger } from '../../shared/logger';

const NUI_CALLBACK_NAME = 'request';

type RequestHandler<T extends keyof NUIComms.Request> = (
  data: NUIComms.Request[T]['data']
) =>
  | NUIComms.Request[T]['response']
  | Promise<NUIComms.Request[T]['response']>
  | void;

class NuiComms {
  private logger: Logger;
  private handlers: Partial<{
    [K in keyof NUIComms.Request]: RequestHandler<K>;
  }>;

  private ready: boolean;
  private awaitingReadyResolvers: (() => void)[];

  constructor() {
    this.logger = new Logger('NuiActions');
    this.handlers = {};
    this.ready = false;
    this.awaitingReadyResolvers = [];

    RegisterNuiCallbackType(NUI_CALLBACK_NAME);
    on(`__cfx_nui:${NUI_CALLBACK_NAME}`, this.handleRequest);

    this.register('ready', () => {
      this.ready = true;
      this.awaitingReadyResolvers.forEach(res => res());
      this.awaitingReadyResolvers = [];
    });

    this.logger.info('Initialized');
  }

  private handleRequest = async <T extends keyof NUIComms.Request>(
    data: { action: T; data: NUIComms.Request[T]['data'] },
    cb: (cb: NUIComms.Response<T>) => void
  ) => {
    const handler = this.handlers[data.action];
    if (!handler) {
      cb({
        data: null,
        meta: {
          ok: false,
          message: `No requesthandler for ${data.action}`,
        },
      });
      return;
    }

    try {
      const result = await this.handlers[data.action]!(data.data);
      cb({ data: result ?? null, meta: { ok: true } });
    } catch (e: any) {
      cb({
        data: null,
        meta: { ok: false, message: e?.message ?? 'Unknown error' },
      });
    }
  };

  public send<T extends keyof NUIComms.Event>(
    action: T,
    data: NUIComms.Event[T]
  ) {
    if (!this.ready) {
      const awaitingReadyPromise = new Promise<void>(res => {
        this.awaitingReadyResolvers.push(res);
      });
      awaitingReadyPromise.then(() => {
        this.send(action, data);
      });
      return;
    }

    SendNUIMessage({ action, data });
  }

  public register<T extends keyof NUIComms.Request>(
    name: T,
    cb: RequestHandler<T>
  ) {
    if (this.handlers[name]) {
      this.logger.error(`Handler for "${String(name)}" already exists`);
      return;
    }

    // @ts-ignore - TS doesn't like this even though it's valid
    this.handlers[name] = cb;
  }
}

export const nuiComms = new NuiComms();
