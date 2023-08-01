import Home from "./src/components/pages/Home";
import Results from "./src/components/pages/Results";
import React from "react";
import { tokens } from "./tokens";
import { getTrendingResults } from "./src/components/pages/Home";
const getInitialSearchData=(reqUrl)=>{
    const body={
        api_key: tokens.GiphyKey,
        q: decodeURI(reqUrl).split('/')[2],
        limit: 40,
        offset:0
    }
    request({
        url:'https://api.giphy.com/v1/gifs/search',
        method:'GET',
        qs:body
    }, (err, response, body)=>{
        const ApiData=JSON.parse(body)
        return ApiData
    })
}
const routes=[{
    path:'/',
    component: Home,
    loadData:getTrendingResults
}, {
    path:'/search/:id',
    component: Results ,
    loadData:getInitialSearchData
}]
export default routes