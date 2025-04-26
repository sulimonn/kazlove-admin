import { Helmet } from 'react-helmet-async';

import { ProfilesView } from 'src/sections/profiles/view';

// ----------------------------------------------------------------------

export default function ProfilesPage() {
  return (
    <>
      <Helmet>
        <title> Анкеты | KazLove Admin </title>
      </Helmet>

      <ProfilesView />
    </>
  );
}
