import { Outlet } from 'react-router';
import './App.css';
import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
