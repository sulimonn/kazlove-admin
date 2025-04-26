import { Helmet } from 'react-helmet-async';

import { FilterView } from 'src/sections/filters/view';

// ----------------------------------------------------------------------

export default function FilterPage() {
  return (
    <>
      <Helmet>
        <title> Фильтры | KazLove Admin </title>
      </Helmet>

      <FilterView />
    </>
  );
}
