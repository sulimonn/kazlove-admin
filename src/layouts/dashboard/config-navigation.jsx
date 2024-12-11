// ----------------------------------------------------------------------

const navConfig = [
  {
    id: 'users',
    title: 'Пользователи',
    path: '/users',
    icon: 'eva:people-fill',
  },
  {
    id: 'unchecked',
    title: 'Непросмотренные',
    path: '/profiles/unchecked',
    icon: 'eva:eye-fill',
  },
  {
    id: 'active',
    title: 'Активные анкеты',
    path: '/profiles/active',
    icon: 'eva:checkmark-fill',
  },
  {
    id: 'rejected',
    title: 'Отклоненные',
    path: '/profiles/rejected',
    icon: 'eva:close-fill',
  },
  {
    id: 'filters',
    title: 'Фильтры',
    path: '/filters',
    icon: 'carbon:filter',
  },
];

export default navConfig;
