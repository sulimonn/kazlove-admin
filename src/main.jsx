import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

import App from './app';
import { store } from './store';
import AuthProvider from './contexts';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter basename="/admin">
      <ReduxProvider store={store}>
        <AuthProvider>
          <Suspense>
            <App />
          </Suspense>
        </AuthProvider>
      </ReduxProvider>
    </BrowserRouter>
  </HelmetProvider>
);
