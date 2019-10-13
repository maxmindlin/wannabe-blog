import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import PostDisplay from '../pages/PostDisplay';
import PostList from '../pages/PostList';
import Missing404 from '../pages/404';

const Web = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/posts/:id?" component={PostDisplay} />
    <Route exact path="/posts/tags/:tag?" component={PostList} />
    <Route component={Missing404} />
  </Switch>
);

export default Web;
