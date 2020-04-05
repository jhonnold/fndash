import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './pages/main-page';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={MainPage} />
        </Switch>
    </Router>
);

export default hot(App);
