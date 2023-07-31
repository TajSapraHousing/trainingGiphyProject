import React, { useEffect, useRef, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GifColumns from '../unit/columns'
import { Creators } from '../../state'
import { tokens } from '../../../tokens'
export default function Results() {
  const searchedData=useParams().id
  console.log('hello world', window.ApiData==='')
  useEffect(()=>{
    if(window.ApiData===''){
      const apiUrl = 'https://api.giphy.com/v1/gifs/search';
      const queryParams = new URLSearchParams({
        api_key: tokens.GiphyKey,
        q: searchedData,
        limit: 40
      });    
      const url = `${apiUrl}?${queryParams}`;
      console.log("Here Checker")
      fetch(url).then((response)=>{
        response.json().then((respdata)=>{
          window.ApiData=respdata.data
          window.ApiData.filter(function( element ) {
            return element !== undefined;
         });
          SetServerData(window.ApiData)
          console.log(window.ApiData)
        })  
      });        
    }
      
  })
  useEffect(()=>{
    const apiUrl = 'https://api.giphy.com/v1/gifs/search';
    const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      q: searchedData,
      limit: 40
    });    

    const url = `${apiUrl}?${queryParams}`;
    console.log("Here Checker")
    fetch(url).then((response)=>{
      response.json().then((respdata)=>{
        window.ApiData=respdata.data
        window.ApiData.filter(function( element ) {
          return element !== undefined;
       });
        SetServerData(window.ApiData)        
        console.log(window.ApiData)
      })  
    });            
  }, [searchedData])
  const [nextOffset, setNextOffset]=useState(40)
  const [serverData, SetServerData]=useState(window.ApiData.data)
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
      console.log(serverData)    
    }
    console.log("Here1")
    const apiUrl = 'https://api.giphy.com/v1/gifs/search';
    const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      q: searchedData,
      limit: 40,
      offset:nextOffset
    });
    const url = `${apiUrl}?${queryParams}`;
    console.log("Here2")
    const response = await fetch(url);        
    response.json().then((respdata)=>{
      let mergedData=helper(serverData,respdata.data)
      console.log("Here3", mergedData)
      SetServerData(mergedData)     
      console.log("Here4", nextOffset, mergedData.length, serverData.length)
      setNextOffset(mergedData.length) 
    })
  }

  useEffect(()=>{
    const intersectionObserver = new IntersectionObserver(entries => {
      console.log(entries[0].isIntersecting)
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
