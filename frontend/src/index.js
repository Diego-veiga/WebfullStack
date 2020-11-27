import React  from 'react';
import ReactDom from 'react-dom';
import App  from './App';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

library.add(faExclamationTriangle);

ReactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,

    document.getElementById('root')
);