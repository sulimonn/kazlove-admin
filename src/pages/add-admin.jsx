import { Helmet } from 'react-helmet-async';

import AdminForm from 'src/sections/user/admin-form';

// ----------------------------------------------------------------------

export default function FilterPage() {
  return (
    <>
      <Helmet>
        <title> Админ | KazLove </title>
      </Helmet>

      <AdminForm />
    </>
  );
}
