import { type NUIComms } from '@shared/types/nui-comms';

class NuiComms {
  private endpoint: string;

  constructor() {
    if (import.meta.env.PROD) {
      //@ts-ignore
      this.endpoint = `https://${GetParentResourceName()}/request`;
    } else {
      this.endpoint = '';
    }
  }

  public async request<T extends keyof NUIComms.Request>(
    action: T,
    data: NUIComms.Request[T]['data'] = null
  ): Promise<NUIComms.Request[T]['response'] | null> {
    if (import.meta.env.DEV) return null;

    const result: NUIComms.Response<T> = await fetch(this.endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        action,
        data,
      }),
    }).then(res => res.json());

    if (!result.meta.ok) {
      throw new Error(result.meta.message);
    }

    return result.data;
  }
}

export const nuiComms = new NuiComms();
