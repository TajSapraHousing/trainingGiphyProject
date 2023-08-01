import React from 'react';
import styles from '../assets/styles.modules.css';
import routes from '../../routes';
import { renderRoutes } from 'react-router-config';

export default function App() {
  return (
    <div className={styles.display}>
      {renderRoutes(routes)}
    </div>
  );
}
