import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Banner from '../components/banner';
import ActiveUsers from '../components/active-users';

const MainPage = () => (
    <>
        <Helmet>
            <title>FN Dash</title>
        </Helmet>
        <div className="home-container">
            <Banner />
            <Switch>
                <Route path="/signup" component={ActiveUsers} />
                <Route path="/about" component={ActiveUsers} />
                <Route path="/" component={ActiveUsers} />
            </Switch>
        </div>
    </>
);

export default MainPage;
