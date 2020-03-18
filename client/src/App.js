import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Users from "./components/Users";
import Posts from "./components/Posts";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Users} />
        <Route path="/:id" component={Users} />
      </div>
    </Router>
  );
}

export default App;
