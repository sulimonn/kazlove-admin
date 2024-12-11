import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
  name: 'catalog',
  initialState: {
    filter: [
      {
        id: 'breast_size',
        name: 'Размер груди',
        title: 'По размеру груди',
        type: 'swiper',
        max: 10,
        min: 0,
        step: 0.1,
        selected: [],
      },
      {
        id: 'age',
        name: 'Возраст',
        title: 'По возрасту',
        type: 'swiper',
        max: 99,
        min: 18,
        step: 1,
        selected: [],
      },
      {
        id: 'height',
        name: 'Рост',
        title: 'По росту',
        type: 'swiper',
        max: 250,
        min: 100,
        step: 1,
        selected: [],
      },
      {
        id: 'weight',
        name: 'Вес',
        title: 'По весу',
        type: 'swiper',
        max: 200,
        min: 18,
        step: 1,
        selected: [],
      },
      {
        id: 'price',
        name: 'Цена',
        title: 'По цене',
        type: 'swiper',
        max: 100000,
        min: 0,
        step: 500,
        selected: [],
      },
      {
        id: 'nationality',
        name: 'Нация',
        title: 'По нации',
        value: ['Русский', 'Марсианка'],
        type: 'button',
        options: [
          {
            id: 'nationality-russian',
            name: 'Русский',
          },
          {
            id: 'nationality-marsian',
            name: 'Марсианка',
          },
        ],
        selected: [],
      },
    ],
    sort: [
      {
        id: 'age',
        name: 'Возраст',
        option: '',
      },
      {
        id: 'price',
        name: 'Цена',
        option: '',
      },
      {
        id: 'height',
        name: 'Рост',
        option: '',
      },
      {
        id: 'weight',
        name: 'Вес',
        option: '',
      },
      {
        id: 'chest',
        name: 'Грудь',
        option: '',
      },
    ],
  },
  reducers: {
    setActions: (state, action) => {
      state.actions = action.payload;
    },
    setSortOption: (state, action) => {
      const { id, option } = action.payload;

      state.sort = state.sort.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            option,
          };
        }
        return item;
      });
    },
    selectFilter: (state, action) => {
      const { id, value } = action.payload;
      state.actions = state.actions.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: value,
          };
        }
        return item;
      });
    },
  },
});

export const { setActions, setSortOption, selectFilter } = actionsSlice.actions;
export default actionsSlice.reducer;
