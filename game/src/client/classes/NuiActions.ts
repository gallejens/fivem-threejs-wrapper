import {
  type NUIEvent,
  type NUIRequest,
  type NUIResponse,
} from '@shared/types/nui';
import { Logger } from '../../shared/logger';

const NUI_CALLBACK_NAME = 'request';

type NUIRequestHandler<T extends keyof NUIRequest = keyof NUIRequest> = (
  data: NUIRequest[T]['data']
) => NUIRequest[T]['response'] | Promise<NUIRequest[T]['response']> | void;

class NuiActions {
  private logger: Logger;
  private handlers: Partial<{
    [K in keyof NUIRequest]: NUIRequestHandler<K>;
  }>;

  private ready: boolean;
  private awaitingReadyResolvers: (() => void)[];

  constructor() {
    this.logger = new Logger('NuiActions');
    this.handlers = {};
    this.ready = false;
    this.awaitingReadyResolvers = [];

    global.RegisterNuiCallbackType(NUI_CALLBACK_NAME);
    global.on(`__cfx_nui:${NUI_CALLBACK_NAME}`, this.handleRequest);

    this.register('ready', () => {
      this.ready = true;
      this.awaitingReadyResolvers.forEach(res => res());
      this.awaitingReadyResolvers = [];
    });

    this.logger.info('Initialized');
  }

  private handleRequest = async <T extends keyof NUIRequest>(
    data: { action: T; data: NUIRequest[T]['data'] },
    cb: (cb: NUIResponse<T>) => void
  ) => {
    const handler = this.handlers[data.action];
    if (!handler) {
      this.logger.warn(`No handler for "${String(data.action)}"`);
      cb({ data: null, meta: { ok: true } });
      return;
    }

    const result = await this.handlers[data.action]?.(data.data);

    if (result === undefined) {
      cb({ data: null, meta: { ok: true } });
      return;
    }

    cb({ data: result, meta: { ok: true } });
  };

  public send<T extends keyof NUIEvent>(action: T, data: NUIEvent[T]) {
    if (!this.ready) {
      const awaitingReadyPromise = new Promise<void>(res => {
        this.awaitingReadyResolvers.push(res);
      });
      awaitingReadyPromise.then(() => {
        this.send(action, data);
      });
      return;
    }

    global.SendNUIMessage({ action, data });
  }

  public register<T extends keyof NUIRequest>(
    name: T,
    cb: NUIRequestHandler<T>
  ) {
    if (this.handlers[name]) {
      this.logger.error(`Handler for "${String(name)}" already exists`);
      return;
    }

    //@ts-ignore
    this.handlers[name] = cb;
  }
}

export const nuiActions = new NuiActions();
