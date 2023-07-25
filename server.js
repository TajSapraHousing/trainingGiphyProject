import express from "express";
import React from "react";
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
const renderedPage=(jsx, preLoadedState)=>{
    return `
    <!doctype html>
    <html>
      <head>
      <title>Server-Side Rendering Taj</title>
      </head>
      <body>
        <div id="root">${jsx}</div>
        <script>
          window._PRELOADED_STATE_ = ${JSON.stringify(preLoadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="/clientBundle.js"></script>
      </body>
    </html>
    `
}
app.get('*', (req,res)=>{
    const jsx=renderToString(
        <Provider store={store}>
            <StaticRouter>
                <App />
            </StaticRouter>
        </Provider>
    )
    const preLoadedState=store.getState()
    res.send(renderedPage(jsx, preLoadedState))
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})