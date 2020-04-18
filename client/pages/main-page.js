import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Banner from '../components/banner';
import Home from '../components/home';
import About from '../components/about';
import SignUp from '../components/sign-up';

const MainPage = () => (
    <>
        <Helmet>
            <title>FN Dash</title>
        </Helmet>
        <Banner />
        <Grid fluid className="main">
            <Grid>
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </Grid>
        </Grid>
    </>
);

export default MainPage;
