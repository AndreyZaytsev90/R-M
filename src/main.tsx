import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { CharactersList } from './pages/CharactersList/CharactersList.tsx';
import { CharacterCard } from './pages/CharacterCard/CharacterCard.tsx';

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
