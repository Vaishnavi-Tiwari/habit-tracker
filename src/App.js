import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/Home/Home";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/addHabit" exact component={Home} /> */}
          <Route path="/auth" exact component={Auth} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
