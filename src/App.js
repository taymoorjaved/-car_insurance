import React from 'react';
import Home from './components/home/Home';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/header/Header';
import CarDetails from './components/carDetails/CarDetails';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route
          exact
          path='/details/:make/:model'
          component={CarDetails}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
