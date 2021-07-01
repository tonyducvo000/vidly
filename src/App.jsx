import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies';


import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

import './App.css';

class App extends Component {


  render() {
    // <Switch> is needed if a user hits /customers, for example, the app will
    // redirect users to movies.  The from=="/" matches any url with / and would redirect 
    // users to movies.

    // Also need to add exact attribute, since hitting /xyz, for example, would redirect
    // users to movies, since /xyx starts with / and this matches from="/"
    return (
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>


    );
  }
}

export default App;