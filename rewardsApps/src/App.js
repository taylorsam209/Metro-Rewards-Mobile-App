import React, { Component } from 'react';
import { LoginStack } from './navigation/Tabs/TabNavigator';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <LoginStack style={{ height: 30, flex: 1 }}navigation={this.props.navigation}/>
             </Provider>

        );
    }
};