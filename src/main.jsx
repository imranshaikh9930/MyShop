import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import {store} from './redux/store.jsx';
import MyProvider from './Context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store} >
    <MyProvider>

    <App />
    </MyProvider>
  </Provider>
  // </React.StrictMode>,
)
