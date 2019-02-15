import { createStore } from 'lib/hookstated';

type State = {
  pos: number;
};

const spaceScroll = createStore<State>('spaceScroll', {
  state: {
    pos: 0,
  },
});

export default spaceScroll;
