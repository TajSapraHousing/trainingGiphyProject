import React, { useEffect, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import {tokens} from '../../../tokens'
import {Creators} from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GifColumns from '../unit/columns'
export default function Home() {
  const [trendingData, setTrending]=useState('')
  useEffect(()=>{
    getTrendingResults()

  },[])
  const getTrendingResults=async()=>{
    const apiUrl = 'https://api.giphy.com/v1/gifs/trending';
    const queryParams = new URLSearchParams({
        api_key: tokens.GiphyKey,
        limit: 40,
    });
    const url = `${apiUrl}?${queryParams}`;
    const response = await fetch(url);        
    const respdata=await response.json()
    setTrending(respdata.data)
  }
  return (
    <>
    <h1 style={{textAlign:'center', color:'white', marginBottom:'3%', paddingTop:'0', marginTop:'3%'}}>Trending Gifs</h1>
    <div className={styles.homeContainer}>
      <GifColumns cardsdata={trendingData.slice(0,trendingData.length/4)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length/4, trendingData.length/2)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length/2, trendingData.length*3/4)}/>
      <GifColumns cardsdata={trendingData.slice(trendingData.length*(3/4))}/>
    </div>     
    </>
  )
}
