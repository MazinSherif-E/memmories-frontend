import React, { Suspense, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import * as actions from './actions/index';

// npm i react-router-dom@5.3.0

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { connect } from 'react-redux';

const App = (props) =>{
    const user = JSON.parse(localStorage.getItem('profile'))
    
    return(
        <Container maxWidth="xl">
            <Navbar/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/posts" exact component={Home}/>

                {/* <Route path="/" exact component={()=> <Redirect to="/posts"/>}/> */}
                <Route path="/posts/search" exact component={Home}/>
                <Route path="/posts/:id" component={PostDetails}/>
                <Route path="/auth" exact component={()=> ( user ? <Redirect to="/"/> : <Auth/> )}/>
            </Switch>
        </Container>
    )
}

export default App;