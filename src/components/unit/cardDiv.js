import React from 'react';
import styles from '../../assets/styles.modules.css';
const cardDiv=(props) =>{
  return (
    <div className={styles.card}>
      <img key={props.id} src={props.source} alt='Loading...'/>
    </div>
  );
};
export default cardDiv;
