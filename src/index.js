import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SettingsProvider from './context/SettingsProvider';

ReactDOM.render(
    <SettingsProvider>
        <App />
    </SettingsProvider>
    ,
    document.getElementById('root')
);


serviceWorker.unregister();
