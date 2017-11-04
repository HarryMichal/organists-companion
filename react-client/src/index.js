import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './content/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('main'));
registerServiceWorker();
