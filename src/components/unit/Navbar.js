import React from 'react';
import styles from '../../assets/styles.modules.css';
import SearchForm from './searchForm';
export default function Navbar() {
  const navbarclass=`navbar navbar-dark bg-dark ${styles.mynavbar}`;
  return (
    <div className={styles.displayContainer}>
      <div className={styles.navdisplay}>
        <div className={navbarclass}>
          <span className="navbar-brand mb-0 h1">Giphy App</span>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
