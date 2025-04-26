import { Helmet } from 'react-helmet-async';

import { TariffsView } from 'src/sections/tariffs/view';

// ----------------------------------------------------------------------

export default function TariffsPage() {
  return (
    <>
      <Helmet>
        <title> Тарифы | KazLove Admin </title>
      </Helmet>

      <TariffsView />
    </>
  );
}
