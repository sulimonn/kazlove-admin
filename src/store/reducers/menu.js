// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  modalOpen: false,
  unchecked: 0,
  rejected: 0,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    openModal(state, action) {
      state.modalOpen = action.payload.modalOpen;
    },
    setRejected(state, action) {
      state.rejected = action.payload;
    },
    setUnchecked(state, action) {
      state.unchecked = action.payload;
    },
  },
});

export default menu.reducer;

export const {
  activeItem,
  activeComponent,
  openDrawer,
  openComponentDrawer,
  openModal,
  setRejected,
  setUnchecked,
} = menu.actions;
