import { Outlet } from 'react-router';
import './App.css';
import { Footer } from './shared/components/Footer/Footer';
import { Header } from './shared/components/Header/Header';

function App() {
  return (
    <div className='main-page'>
      <header className='main-page__header'>
        <Header />
      </header>
      <main className='main-page__content'>
        <Outlet />
      </main>
      <footer className='main-page__footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
