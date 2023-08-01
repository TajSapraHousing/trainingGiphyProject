import express from "express";
import React from "react";
import request from "request";
import { tokens } from "./tokens";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux";
import {StaticRouter} from 'react-router-dom/server'
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import reducers from './src/state/reducers/index'
import { matchRoutes, renderRoutes } from "react-router-config";
import routes from "./routes";
import { matchPath } from "react-router";
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
let matches=[]
const myMatcher=(routes, location)=>{
    routes.forEach(element => {
        const matched=matchPath(element, location)
        if(matched){
            matches.push(element)
            if(element.routes){
                myMatcher(element.routes, location)
            }
        }        
    });
}
const loadBranchData=(location)=>{
    myMatcher(routes, location)
    const promises=matches.map(match =>match.loadData())
    return promises
}
app.get('*', (req,res)=>{
    const preLoadedState=store.getState()
    const data=loadBranchData(req.path)
    Promise.all(data).then((final_data)=>{
        console.log('here1')
        const jsx=renderToString(
            <Provider store={store}>
              <StaticRouter location={req.path} context={{}}>
                <div>{renderRoutes(routes)}</div>
              </StaticRouter>
            </Provider>
          )      
        console.log('here2')
        res.render(renderedPage(jsx, preLoadedState,final_data[0]))
    })
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})