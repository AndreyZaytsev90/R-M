import { Outlet } from 'react-router';
import './App.css';
import { Footer } from './shared/components/Footer/Footer';
import { Header } from './shared/components/Header/Header';

function App() {
  return (
    <div className='main-page'>
      <header className='main-page__header'>
        <div className='main-page__container'>
          <Header />
        </div>
      </header>
      <main className='main-page__content'>
        <div className='main-page__container'>
          <Outlet />
        </div>
      </main>
      <footer className='main-page__footer'>
        <div className='main-page__container'>
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default App;
