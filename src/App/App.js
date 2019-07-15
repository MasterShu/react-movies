import React from 'react';
import './App.css';
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NotFound from "../components/NotFound/NotFound";
import Movie from "./Movie/Movie";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:movieId" component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
};

export default App;
