import { createStore } from 'hookstated';

type galleryModal = {
  activeProject: number;
  activePos: number;
  isOpen: boolean;
};

type reducers = {
  openProject: { project: number };
};

const galleryModalState = createStore<galleryModal, reducers>('galleryModal', {
  state: {
    activePos: 0,
    activeProject: 0,
    isOpen: false,
  },
  reducers: {
    openProject: (state, { project }) => ({
      ...state,
      activeProject: project,
      activePos: project !== state.activeProject ? 0 : state.activePos,
      isOpen: true,
    }),
  },
});

export default galleryModalState;
