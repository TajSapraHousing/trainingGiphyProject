import express from "express";
import React from "react";
import request from "request";
import { tokens } from "./tokens";
import ReactDomServer,{ renderToString } from 'react-dom/server'
import { Provider } from "react-redux";
import {StaticRouter} from 'react-router-dom/server'
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import App from './src/components/App'
import reducers from './src/state/reducers/index'
const app=express()
const port=3000
app.use(express.static('dist'))

const store=createStore(reducers, applyMiddleware(thunk))
const renderedPage=(jsx, preLoadedState, ApiData='')=>{
    return `
    <!doctype html>
    <html>
      <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      <title>Server-Side Rendering Taj</title>
      </head>
      <body>
        <div id="root">${jsx}</div>
        <script>
          window._PRELOADED_STATE_ = ${JSON.stringify(preLoadedState).replace(
            /</g,
            '\\u003c'
          )}
          window.ApiData=${JSON.stringify(ApiData).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/clientBundle.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>      </body>
    </html>
    `
}
app.get('*', (req,res)=>{
    if(req.url.split('/').length==2){
        const jsx=renderToString(
            <Provider store={store}>
                <StaticRouter>
                    <App />
                </StaticRouter>
            </Provider>
        )
        const preLoadedState=store.getState()
        res.send(renderedPage(jsx, preLoadedState))
    }
    else if(req.url.split('/').length==3&&req.url.split('/')[1]=='search'){
        const body={
            api_key: tokens.GiphyKey,
            q: decodeURI(req.url).split('/')[2],
            limit: 40,
            offset:0
        }
        request({
            url:'https://api.giphy.com/v1/gifs/search',
            method:'GET',
            qs:body
        }, (err, response, body)=>{
            const ApiData=JSON.parse(body)
            const jsx=renderToString(
                <Provider store={store}>
                    <StaticRouter>
                        <App />
                    </StaticRouter>
                </Provider>
            )
            const preLoadedState=store.getState()
            res.send(renderedPage(jsx, preLoadedState, ApiData))
       })
    }
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})