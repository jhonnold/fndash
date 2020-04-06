import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Banner from '../components/banner';
import RecentGames from '../components/recent-games';
import About from '../components/about';
import SignUp from '../components/sign-up';

const MainPage = () => (
    <>
        <Helmet>
            <title>FN Dash</title>
        </Helmet>
        <Grid>
            <Banner />
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/about" component={About} />
                <Route path="/" component={RecentGames} />
            </Switch>
        </Grid>
    </>
);

export default MainPage;
