import React, {useEffect, useState} from 'react';
import styles from '../../assets/styles.modules.css';
import CardDiv from './cardDiv';
export default function columns(props) {
  const temp=<div>Loading...</div>;
  const LoadingData=new Array(40).fill(temp);
  const [Cards, setCards]=useState(LoadingData);
  useEffect(()=>{
    if (Array.isArray(props.cardsdata)) {
      setCards(props.cardsdata.map((element) => {
        let datasource=element.images.fixed_width.url;
        if (!datasource) {
          datasource=element.images.original.url;
        }
        return (<CardDiv id={element.id} source={datasource.replace('media0', 'i').replace('media1', 'i').replace('media2', 'i').replace('media3', 'i').replace('media4', 'i').replace('media5', 'i').replace('media6', 'i').replace('media7', 'i').replace('media8', 'i').replace('media9', 'i')}/>);
      }));
    }
  }, [props.cardsdata]);

  return (<div className={styles.cols}> {Cards}
  </div>);
}
