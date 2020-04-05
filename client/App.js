import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    </Router>
);

export default hot(App);
