import { nuiComms } from './classes/NuiComms';

nuiComms.register('request', async data => {
  await new Promise(res => setTimeout(res, 1000));
  return data % 2 === 0;
});

RegisterCommand(
  'req',
  (_: number, args: string[]) => {
    const input = Number(args[0]);
    if (Number.isNaN(input)) return;
    nuiComms.send('request', input);
  },
  false
);

let thread: NodeJS.Timer | null = null;
RegisterCommand(
  'thread',
  () => {
    if (thread) {
      clearInterval(thread);
      thread = null;
      return;
    }

    thread = setInterval(() => {
      const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
      nuiComms.send('coords', { x, y, z });
    }, 1);
  },
  false
);
