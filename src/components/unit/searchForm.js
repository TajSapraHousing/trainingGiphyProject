import React from 'react'
import styles from '../../assets/styles.modules.css'
import {tokens} from '../../../tokens'
import {Creators} from '../../state'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
export default function () {
    const dispatch=useDispatch()    
    const navigate=useNavigate()
    let location=useLocation()
    const [suggestions, setSuggestions]=useState('')
    const [searchqueries,setSearch]=useState('')
    const [showSwitch, setSwitch]=useState(0)
    const data=useSelector(state=>state.valueReducer)
    const handleSearchCardClick=(e)=>{
        dispatch(Creators.changeVal(e.target.innerText))
        navigate(`/search/${e.target.innerText}`)
    }
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
        setSearch(respdata.data)
    }
    useEffect(()=>{
        if(searchqueries===''){return}
        const randomDataOptions = [
          ];
          searchqueries.map(curr=>{
            randomDataOptions.push(curr.name)
          })
        const filteredSuggestions = randomDataOptions.filter(option =>
            option.toLowerCase().includes(data.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        if(data.length>=3){
            setSwitch(1)
        }
        else{
            setSwitch(0)
        }
    }, [data, searchqueries])
    useEffect(()=>{
        if(data.length>=3){
            getResults()
        }
    }, [data])
    useEffect(()=>{
        setSwitch(0)
        dispatch(Creators.changeVal(''))
    }, [location.pathname])
    return (
    <>
    <form className="form-inline">
        <div style={{width:"80%"}}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={data} onChange={(e)=>{dispatch(Creators.changeVal(e.target.value));}} />
            {showSwitch===1&&
                <div className={styles.autoCompleteContainer}>
                    {suggestions!=undefined&&<>
                        {suggestions.length>0?<>
                            {suggestions.map(curr=>{return <div className={styles.searchCard} key={curr} onClick={handleSearchCardClick}>{curr}</div>})}
                            </>:<div>No results</div>
                        }
                    </>}
                </div>
            }
        </div>
        <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch} style={{maxHeight:'4vh'}}>Search</button>
    </form>
    </>
  )
}
