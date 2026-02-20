import { Outlet } from 'react-router';

import { Footer, Header } from '@/shared';

import './App.css';

function App() {
  return (
    <div className='main-page'>
      <div className='main-page__header'>
        <div className='main-page__container'>
          <Header />
        </div>
      </div>
      <div className='main-page__content'>
        <div className='main-page__container'>
          <Outlet />
        </div>
      </div>
      <div className='main-page__footer'>
        <div className='main-page__container'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
