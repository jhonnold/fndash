import React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './pages/main-page';
import UserPage from './pages/user-page';
import Footer from './components/footer';

const App = () => (
    <Router>
        <Switch>
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/" component={MainPage} />
        </Switch>
        <Footer />
    </Router>
);

export default hot(App);
