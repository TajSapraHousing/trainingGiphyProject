import React from 'react'
import styles from '../../assets/styles.modules.css'
const cardDiv=(props) =>{  
  return (
    <div className={styles.card}>
      <img key={props.id} style={{width:'8.928vw', height:'8.928vw'}} src={props.source}/>

    </div>
  )
}
export default cardDiv