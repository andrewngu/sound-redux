import React from 'react';
import {Provider} from 'react-redux';
import App from './containers/App';
import ConfigureStore from './store/ConfigureStore';

require('../sass/main.scss');

const store = ConfigureStore();

React.render(
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    document.getElementById('main')
);
