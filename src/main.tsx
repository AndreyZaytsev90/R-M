import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@/App';
import { CharacterCardPage, CharactersListPage, NotFoundPage } from '@/pages';
import { ErrorFallback } from '@/shared/components';
import { store } from '@/stores/store';
import '@/styles/global.scss';

const queryClient = new QueryClient();

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter basename='/R-M'>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<Navigate to='/characters' replace />} />
              <Route path='characters' element={<CharactersListPage />} />
              <Route path='characters/:id' element={<CharacterCardPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Toaster position='bottom-right' />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </Provider>
);
