import { Helmet } from 'react-helmet-async';

import { UserDataView } from 'src/sections/user/user-view';

// ----------------------------------------------------------------------

export default function UserDataPage() {
  return (
    <>
      <Helmet>
        <title> Пользователь | KazLove Admin </title>
      </Helmet>

      <UserDataView />
    </>
  );
}
