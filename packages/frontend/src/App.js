import React from "react";
import SearchComponent from "./components/SearchComponent"
import StoreListComponent from "./components/StoreListComponent";
import VendorDetails from "./components/VendorDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StoreListComponent}/>
        <Route path="/vendor/:id" component={VendorDetails}/>
      </Switch>
    </Router>

  );
}

export default App;
