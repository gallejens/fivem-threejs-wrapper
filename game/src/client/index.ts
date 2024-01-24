import { nuiActions } from './classes/NuiActions';

setImmediate(() => {
  nuiActions.send('test', { name: 'world' });
});
