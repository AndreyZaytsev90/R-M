import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import App from '@/App';
import { CharacterCardPage, CharactersListPage } from '@/pages';
import '@/styles/global.scss';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Navigate to='/characters' replace />} />
        <Route path='characters' element={<CharactersListPage />} />
        <Route path='characters/:id' element={<CharacterCardPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
