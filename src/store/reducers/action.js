import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
  drawerType: '',
  sortOption: {},
  filterOptions: [],
  city: parseInt(localStorage.getItem('city'), 10) || -1,
  gender: localStorage.getItem('gender')
    ? localStorage.getItem('gender').toString().split(',').map(Number)
    : [],
  services: localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : [],
  breast_size: localStorage.getItem('breast_size')
    ? localStorage.getItem('breast_size').toString().split(',').map(Number)
    : [],
  age: parseInt(localStorage.getItem('age'), 10)
    ? localStorage.getItem('age').split(',').map(Number)
    : [],
  height: parseInt(localStorage.getItem('height'), 10)
    ? localStorage.getItem('height').split(',').map(Number)
    : [],
  weight: parseInt(localStorage.getItem('weight'), 10)
    ? localStorage.getItem('weight').split(',').map(Number)
    : [],
  profile_type: parseInt(localStorage.getItem('profile_type'), 10),
  price: parseInt(localStorage.getItem('price'), 10)
    ? localStorage.getItem('price').split(',').map(Number)
    : [],
};

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.drawerOpen = true;
      state.drawerType = action.payload;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    setDrawerType: (state, action) => {
      state.drawerType = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setFilterOptions: (state, action) => {
      const { id, filter } = action.payload;
      state[filter] = id;
      localStorage.setItem(filter, id);
    },
    setSwiperFilter: (state, action) => {
      const { id, option } = action.payload;
      if (option) {
        state[id] = option;
        localStorage.setItem(id, option);
      } else {
        state[id] = [];
        localStorage.removeItem(id);
      }
    },
    setCity: (state, action) => {
      if (action.payload === -1) {
        state.city = null;
        delete state.city;
        localStorage.removeItem('city');
      } else {
        state.city = action.payload;
        localStorage.setItem('city', action.payload);
      }
    },
    setGender: (state, action) => {
      if (action.payload) {
        const id = parseInt(action.payload, 10);
        const gender = state.gender.map((item) => parseInt(item, 10));

        if (gender.includes(id)) {
          gender.splice(gender.indexOf(id), 1);
        } else {
          gender.push(id);
        }

        state.gender = gender;
        localStorage.setItem('gender', gender);
      } else {
        state.gender = [];
        localStorage.removeItem('gender');
      }
    },
    setServices: (state, action) => {
      if (JSON.stringify(state.services) !== JSON.stringify(action.payload)) {
        state.services = action.payload;
        localStorage.setItem('services', JSON.stringify(action.payload));
      }
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  setDrawerType,
  setSortOption,
  setFilterOptions,
  setCity,
  setGender,
  setSwiperFilter,
  setServices,
} = actionSlice.actions;

export default actionSlice.reducer;
