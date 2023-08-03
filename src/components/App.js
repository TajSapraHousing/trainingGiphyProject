import React from 'react';
import styles from '../assets/styles.modules.css';
import routes from '../../routes';
import { renderRoutes } from 'react-router-config';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
export default function App() {
  return (
    <div className={styles.display}>
      <Routes>
        {routes.map(element=>(
          <Route path={element.path} Component={element.component}></Route>
        ))}
      </Routes>
    </div>
  );
}
