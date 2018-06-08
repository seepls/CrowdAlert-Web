/**
 * CrowdAlert
 * index.js: main entry point of the app
 * eslint is disabled as there are references to window & documnet object.
 */
/* eslint-disable  */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';
import App from './containers/App';

/**
 * [initialState initial state for the App]
 * @type {Object}
 */
const initialState = {};
/**
 * [history instantiate a history object containing the browser history
 *  used to push & pop pages using react-router]
 * @type {[type]}
 */
const history = createHistory();
/**
 * [store contains the redux store for the app]
 * @type {[type]}
 */
const store = configureStore(initialState, history);
/**
 * [ROOT_NODE is the document reference where the app should be mounted]
 * @type {[type]}
 */
const ROOT_NODE = document.getElementById('root');

// Render the app to the specified mount point
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, ROOT_NODE);
/**
 * [registerServiceWorker register the service worker. Required for the PWA
 * behaviour]
 * @param  {none} function [description]
 * @return {none}          [description]
 */
registerServiceWorker();

/**
 * [Manages the initial loading spinner. Shows the spinner until document is
 * rendered. ]
 * @return {[none]} [description]
 */
(function () {
  const delay = 500;
  const dimmer = document.querySelector('#docs-loading-dimmer');
  dimmer.style.pointerEvents = 'none';
  dimmer.style.transition = `opacity ${delay}ms linear`;

  function removeDimmer() {
    dimmer.style.opacity = '0';

    setTimeout(() => {
      const dimmer = document.querySelector('#docs-loading-dimmer');

      document.body.removeChild(dimmer);
      document.body.setAttribute('class', '');
      window.removeEventListener('load', removeDimmer);
    }, delay);
  }

  window.addEventListener('load', removeDimmer);
}());
/**
 * export the browser history instance so that it could be imported later
 */
export default history;
