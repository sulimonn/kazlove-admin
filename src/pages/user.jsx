import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Пользователь | KazLove Admin </title>
      </Helmet>

      <UserView />
    </>
  );
}
