/**
 * CrowdAlert
 * index.js: main entry point of the app
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';

import App from './containers/App'

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const ROOT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
            <App />
        {/* </ConnectedRouter> */}
    </Provider>,    
     ROOT_NODE
);
registerServiceWorker();

(function() {
    var delay = 500
    var dimmer = document.querySelector('#docs-loading-dimmer')
    dimmer.style.pointerEvents = 'none'
    dimmer.style.transition = 'opacity ' + delay + 'ms linear'

    function removeDimmer() {
        dimmer.style.opacity = '0'

        setTimeout(function() {
            var dimmer = document.querySelector('#docs-loading-dimmer')

            document.body.removeChild(dimmer)
            document.body.setAttribute("class", "")
            window.removeEventListener('load', removeDimmer)
        }, delay)
    }

    window.addEventListener('load', removeDimmer)
}())
