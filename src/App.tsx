import { Outlet } from 'react-router';
import './App.css';
import { Footer } from './shared/footer/Footer';
import { Header } from './shared/header/Header';

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
