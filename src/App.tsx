import { Outlet } from 'react-router';

import { Footer, Header } from '@/shared/components';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app__header}>
        <div className={styles.app__headerContainer}>
          <Header />
        </div>
      </div>
      <div className={styles.app__content}>
        <div
          className={`${styles.app__container} ${styles.app__contentContainer}`}
        >
          <Outlet />
        </div>
      </div>
      <div className={styles.app__footer}>
        <div className={styles.app__footerContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
