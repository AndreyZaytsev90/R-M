import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@/App';
import { CharacterCardPage, CharactersListPage } from '@/pages';
import '@/styles/global.scss';

import { ErrorFallback } from './shared/components';

const queryClient = new QueryClient();

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Navigate to='/characters' replace />} />
            <Route path='characters' element={<CharactersListPage />} />
            <Route path='characters/:id' element={<CharacterCardPage />} />
          </Route>
        </Routes>
        <Toaster position='bottom-right' />
      </BrowserRouter>
    </ErrorBoundary>
  </QueryClientProvider>
);
