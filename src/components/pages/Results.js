import React, { useEffect, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GifColumns from '../unit/columns'
import { Creators } from '../../state'
import { tokens } from '../../../tokens'
export default function Results() {
  const [nextOffset, setNextOffset]=useState(40)
  const data=useSelector(state=>state.valueReducer)
  const searchedData=useParams().id
  const [serverData, SetServerData]=useState(window.ApiData.data)
  const helper=(oldD, newD)=>{
    let fcp=(oldD.length/4)
    let scp=(oldD.length/2)
    let tcp=(3*(oldD.length/4))
    let lcp=oldD.length
    console.log(fcp, scp, tcp, lcp)
    for(var i=30;i<40;i++){
      oldD.push(newD[i])
    }
    for(var i=20;i<30;i++){
      oldD.splice(tcp,0, newD[i])   
    }
    for(var i=10;i<20;i++){
      oldD.splice(scp,0, newD[i])   
    }
    for(var i=0;i<10;i++){
      oldD.splice(fcp,0, newD[i])  
    }
    return oldD
  }
  const getNewData=async()=>{
    if(serverData==undefined){
      await SetServerData(window.ApiData.data)
      console.log(serverData)    
    }
    const apiUrl = 'https://api.giphy.com/v1/gifs/search';
    const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      q: searchedData,
      limit: 40,
      offset:nextOffset
    });
    const url = `${apiUrl}?${queryParams}`;
    const response = await fetch(url);        
    const respdata=await response.json()
    console.log(respdata.data, serverData)   
    let mergedData=await helper(serverData,respdata.data)
    await SetServerData(mergedData)     
    console.log(serverData)
    setNextOffset(nextOffset+40)
    console.log("here", nextOffset)
  }
  useEffect(() => {
    console.log(serverData)    
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      if (scrollPosition + viewportHeight >= totalHeight) {
        getNewData()
        console.log("bottom")
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextOffset]);

  return (
    <div className={styles.resultsContainer1}>
      <h1>Search Results</h1>
      <div className={styles.resultsContainer}>
        {serverData!=undefined&&(
          <>
            <GifColumns cardsdata={serverData.slice(0,serverData.length/4)}/>
            <GifColumns cardsdata={serverData.slice(serverData.length/4, serverData.length/2)}/>
            <GifColumns cardsdata={serverData.slice(serverData.length/2, serverData.length*3/4)}/>
            <GifColumns cardsdata={serverData.slice(serverData.length*(3/4))}/>                  
          </>
        )}
      </div>
      
    </div>  
  )
}
