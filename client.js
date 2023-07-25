import React from 'react'
import ReactDomServer from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './src/components/App'
import reducers from './src/state/reducers/index'
import { BrowserRouter } from 'react-router-dom'

const store=createStore(reducers, window.__preLoadedState__, applyMiddleware(thunk))
delete window.__preLoadedState__
hydrateRoot(document.getElementById('root'), 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)