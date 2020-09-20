import React from 'react';
import { Switch, Route, } from "react-router-dom";

import Login from '../screens/Login/Login'
import HandleDomains from '../screens/HandleDomains/HandleDomains'

const ScreenRoutes = () => {
    return (
        <Switch>
            <Route exact={true} path="/domains/add" component={HandleDomains} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/" component={Login} />
        </Switch>
    )
}

export default ScreenRoutes;
