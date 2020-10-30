import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from 'react-redux'
import rootReducer from '../redux/combineReducers';
import Container from '@material-ui/core/Container';
import RouterApp from '../routes';

const Store = createStore(
    rootReducer,
    composeWithDevTools()
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        /*
        this.state = {
            theme: this.getTheme()
        }
        */
    }

    render() {
        return (
            <Container>
                <Provider store={ Store }>
                    <Router>
                        <RouterApp />
                    </Router>
                </Provider>
            </Container>
        );
    }
}

export default App;
