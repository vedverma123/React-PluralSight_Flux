import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursesPage";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router-dom";
import ManageCourse from "./ManageCourse";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/courses" component={CoursesPage}></Route>
        <Route exact path="/about" component={AboutPage}></Route>
        <Route exact path="/course/:slug" component={ManageCourse}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
