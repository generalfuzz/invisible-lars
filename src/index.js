import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import larsImgMovingApp from './reducers';
import App from './components/App';


// initial state
const initialState = {
    level: -1,
    score: 0,
    img: 0,
    displayInstructions: true
};

const store = createStore(larsImgMovingApp, initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
