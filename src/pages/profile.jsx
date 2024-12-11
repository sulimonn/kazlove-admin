import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profiles/profile-view';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Фильтры | KazLove </title>
      </Helmet>

      <ProfileView />
    </>
  );
}