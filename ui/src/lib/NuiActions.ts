import { type NUIRequest, type NUIResponse } from '@shared/types/nui';

class NuiActions {
  private endpoint: string;

  constructor() {
    //@ts-ignore
    this.endpoint = `https://${GetParentResourceName()}/request`;
  }

  public async request<T extends keyof NUIRequest>(
    action: T,
    data: NUIRequest[T]['data'] = null
  ) {
    const result: NUIResponse<T> = await fetch(this.endpoint, {
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

export const nuiActions = new NuiActions();
