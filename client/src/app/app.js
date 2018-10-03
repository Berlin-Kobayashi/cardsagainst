import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import MainContainer from "./containers/mainContainer";
import {createStore} from "redux";
import reducer from "./reducers/reducers";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <MainContainer/>
    </Provider>,
    document.getElementById('app')
);
