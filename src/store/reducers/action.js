import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
  drawerType: '',
  sortOption: {},
  filterOptions: [],
  city: localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) : -1,
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
  codeSent: localStorage.getItem('codeSent') || false,
  email: localStorage.getItem('email'),
  password: localStorage.getItem('password'),
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
        localStorage.setItem('city', JSON.stringify(action.payload));
      }
    },
    setEmail: (state, action) => {
      state.codeSent = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem('codeSent', true);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('password', action.payload.password);
    },
    resetCode: (state, action) => {
      state.codeSent = false;
      state.email = null;
      state.password = null;
      localStorage.removeItem('codeSent');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
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
  setEmail,
  resetCode,
} = actionSlice.actions;

export default actionSlice.reducer;
