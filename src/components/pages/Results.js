import React, { useEffect, useRef, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import { useLocation, useParams } from 'react-router-dom'
import GifColumns from '../unit/columns'
import Navbar from '../unit/Navbar'
import { tokens } from '../../../tokens'

export const getInitialSearchData=async (reqUrl)=>{
  const apiUrl = 'https://api.giphy.com/v1/gifs/search';
  const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      limit: 40,
      offset:0
  });
  const url = `${apiUrl}?${queryParams}`;
  const response = await fetch(url);        
  const respdata=await response.json()
  return respdata.data
}
export default function Results() {
  const searchedData=useParams().id
  const location=useLocation()
  useEffect(()=>{
    if(!window.ApiData){
      window.ApiData=getInitialSearchData(location.pathname)
    }
    SetServerData(window.ApiData)
  })
  useEffect(()=>{
    const apiUrl = 'https://api.giphy.com/v1/gifs/search';
    const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      q: searchedData,
      limit: 40
    });    

    const url = `${apiUrl}?${queryParams}`;
    fetch(url).then((response)=>{
      response.json().then((respdata)=>{
        window.ApiData=respdata.data
        window.ApiData.filter(function( element ) {
          return element !== undefined;
       });
        SetServerData(window.ApiData)        
      })  
    });            
  }, [searchedData])
  const [nextOffset, setNextOffset]=useState(40)
  const [serverData, SetServerData]=useState('')
  const lastElementRef=useRef(null)
  const helper=(oldD, newD)=>{
    let fcp=(oldD.length/4)
    let scp=(oldD.length/2)
    let tcp=(3*(oldD.length/4))
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
    response.json().then((respdata)=>{
      let mergedData=helper(serverData,respdata.data)
      SetServerData(mergedData)     
      setNextOffset(mergedData.length) 
    })
  }

  useEffect(()=>{
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting&&serverData.length>=40){
        getNewData()
      }
    });
    if(lastElementRef.current)
      intersectionObserver.observe(lastElementRef.current);
    return ()=>{
      if(lastElementRef.current)
        intersectionObserver.unobserve(lastElementRef.current)
    }
  }, [nextOffset, serverData])

  return (
    <>
    <Navbar />
    {serverData?(    
      <div className={styles.resultsContainer1}>
      <h1>Search Results:</h1>
      <div className={styles.resultsContainer}>
          <>
            {serverData.length>=1&&(<GifColumns cardsdata={serverData.slice(0,Math.max(serverData.length/4, 1))}/>)}
            {serverData.length>=2&&(<GifColumns cardsdata={serverData.slice(Math.max(serverData.length/4, 1), Math.max(serverData.length/2, 2))}/>)}
            {serverData.length>=3&&(<GifColumns cardsdata={serverData.slice(Math.max(serverData.length/2, 2), Math.max(((serverData.length*3)/4),3))}/>)}
            {serverData.length>=4&&(<GifColumns cardsdata={serverData.slice(serverData.length*(3/4))}/>)}
          </>
      </div>
      <div id='lastElementRef' className={styles.searchFooter} ref={lastElementRef}></div>
    </div>):<>No Data</>}
    </>
  )
}
