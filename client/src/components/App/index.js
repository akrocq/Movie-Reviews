import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


//import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';

import Reviews from "../Reviews";
import Landing from "../Landing";
import Mypage from "../Mypage";
import Search from "../Search";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        <PrivateRoute exact path="/" component={Search}/>
	    </div>
	  </Router>
    );
  }
}

export default App;