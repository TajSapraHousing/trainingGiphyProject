import React, { useEffect, useState } from 'react'
import styles from '../../assets/styles.modules.css'
import {tokens} from '../../../tokens'
import {Creators} from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Navbar() {
    const dispatch=useDispatch()    
    const navigate=useNavigate()
    let location=useLocation()
    const data=useSelector(state=>state.valueReducer)
    const handleSearch=(e)=>{
        e.preventDefault()
        if(data==='', location.pathname===''){
            return
        }
        if(data===''){
            navigate('/')
        }
        else{
            navigate(`/search/${data}`)
        }
    }
    const getResults=async()=>{
        const apiUrl = 'https://api.giphy.com/v1/gifs/search/tags';
        const queryParams = new URLSearchParams({
            api_key: tokens.GiphyKey,
            q: data,
            limit: 20,
        });
        const url = `${apiUrl}?${queryParams}`;
        const response = await fetch(url);        
        const respdata=await response.json()
        console.log(respdata.data)
    }
    useEffect(()=>{
        console.log(data)
        if(data.length>=3){
            getResults()
        }
    }, [data])
    let navbarclass=`navbar navbar-dark bg-dark ${styles.mynavbar}`
    return (    
        <div className={styles.displayContainer}>
            <div className={styles.navdisplay}>
                <div className={navbarclass}>
                    <span className="navbar-brand mb-0 h1">Giphy App</span>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={data} onChange={(e)=>{dispatch(Creators.changeVal(e.target.value));}} />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
                    </form>
                </div>            
            </div>
        </div>
    )
}