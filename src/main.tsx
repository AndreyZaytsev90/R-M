import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CharactersList } from './pages/charactersList/CharactersList.tsx';
import { CharactersInfo } from './pages/charactersInfo/CharactersInfo.tsx';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<App />}
      />
      <Route
        path='/characters-list'
        element={<CharactersList />}
      />
      <Route
        path='/characters-info'
        element={<CharactersInfo />}
      />
    </Routes>
  </BrowserRouter>
);
