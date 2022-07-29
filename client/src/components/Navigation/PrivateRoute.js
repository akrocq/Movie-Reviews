import React from "react";
import { Router, Switch, Route } from "react-router-dom";
//import Home from '../Home';
import Reviews from "../Reviews";
import Landing from "../Landing";
import Mypage from "../Mypage";
import Search from "../Search";
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
        <Route path="/reviews" exact component={Reviews} />
        <Route path="/" exact component={Landing} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/search" exact component={Search} />
      </Switch>
    </Router>
  );
}