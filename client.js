import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import routes from './routes';
import reducers from './src/state/reducers/index'
import { BrowserRouter } from 'react-router-dom'
import App from './src/components/App'
import { renderRoutes } from 'react-router-config'
const store=createStore(reducers, window.__preLoadedState__, applyMiddleware(thunk))
delete window.__preLoadedState__
hydrateRoot(document.getElementById('root'), 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)