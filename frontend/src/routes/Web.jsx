import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Missing404 from '../pages/404';

const Web = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={Missing404} />
  </Switch>
)

export default Web;