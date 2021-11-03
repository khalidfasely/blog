import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configeStore from './store/configureStore';
//import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoute from './router/AppRouter';
import { startSetUser } from './actions/auth';
import { startSetBlogs } from './actions/blogs';
import { startSetSavedBlogs } from './actions/savedBlogs';

const store = configeStore();

const renderApp = () => {
  store.dispatch(startSetBlogs()).then(()=> {
    store.dispatch(startSetUser()).then(() => {
      store.dispatch(startSetSavedBlogs()).then(() => {
        ReactDOM.render(
          <React.StrictMode>
            <Provider store={store}>
              <AppRoute />
            </Provider>
          </React.StrictMode>,
          document.getElementById('root')
        );
      })
    })
  })
}

renderApp();

//ReactDOM.render(
//  <React.StrictMode>
//    <Provider store={store}>
//      <AppRoute />
//    </Provider>
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
