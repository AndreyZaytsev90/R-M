import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import App from '@/App';
import { CharacterCard, CharactersList } from '@/pages';
import '@/styles/global.css';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Navigate to='/characters' replace />} />
        <Route path='characters' element={<CharactersList />} />
        <Route path='characters/character-card' element={<CharacterCard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
