import React, { useEffect, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import {tokens} from '../../../tokens'
import GifColumns from '../unit/columns'
import Navbar from '../unit/Navbar'
export const getTrendingResults=async(reqUrl)=>{
  const apiUrl = 'https://api.giphy.com/v1/gifs/trending';
  const queryParams = new URLSearchParams({
      api_key: tokens.GiphyKey,
      limit: 40,
  });
  const url = `${apiUrl}?${queryParams}`;
  const response = await fetch(url);        
  const respdata=await response.json()
  return respdata.data
}

export default function Home() {
  const [trendingData, setTrending]=useState('')
  useEffect(()=>{
    if(!window.ApiData){
      window.ApiData=getTrendingResults('/')
    }
    setTrending(window.ApiData)
  })
  return (
    <>
    <Navbar />
    {trendingData&&(<>
      <h1 style={{textAlign:'center', color:'white', marginBottom:'3%', paddingTop:'0', marginTop:'3%'}}>Trending Gifs</h1>
    <div className={styles.homeContainer}>
      <GifColumns cardsdata={trendingData.slice(0,trendingData.length/4)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length/4, trendingData.length/2)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length/2, trendingData.length*3/4)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length*(3/4))}/>
    </div>    
    </>)} 
    </>
  )
}
