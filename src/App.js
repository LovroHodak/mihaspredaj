import "./App.css";
import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { MyProvider } from "./MyContext";
import Home from "./components/Home";
import Navv from "./components/Navv";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Kuhinja from "./components/Kuhinja";
import Vrt from "./components/Vrt";
import Sport from "./components/Sport";
import Relax from "./components/Relax";
import Drugo from "./components/Drugo";
import Detail from "./components/Detail";
import UserData from "./components/UserData";
import SuccessPage from "./components/SuccessPage";
import Admin from "./components/Admin";
import CardComponent from "./components/CardComponent";
import TermsConditions from "./components/TermsConditions";

import { CategoriesProvider } from "./hooks/use-categories";

console.log('app outside function')

function App() {
  return (
    <MyProvider>
      <CategoriesProvider>
        <div className="App">
          <Navv />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Home />;
              }}
            />

            <Route
              exact
              path="/cart"
              render={() => {
                return <Cart />;
              }}
            />
            <Route
              exact
              path="/kuhinja"
              render={() => {
                return <Kuhinja />;
              }}
            />
            <Route
              exact
              path="/vrt"
              render={() => {
                return <Vrt />;
              }}
            />
            <Route
              exact
              path="/sport"
              render={() => {
                return <Sport />;
              }}
            />
            <Route
              exact
              path="/drugo"
              render={() => {
                return <Drugo />;
              }}
            />
            <Route
              exact
              path="/relax"
              render={() => {
                return <Relax />;
              }}
            />
            <Route
              exact
              path="/detail/:id"
              render={(routeProps) => {
                return <Detail {...routeProps} />;
              }}
            />
            <Route
              exact
              path="/userData"
              render={() => {
                return <UserData />;
              }}
            />
            <Route
              exact
              path="/successPage"
              render={() => {
                return <SuccessPage />;
              }}
            />
            <Route
              exact
              path="/admin"
              render={() => {
                return <Admin />;
              }}
            />
            <Route
              exact
              path="/cardComponent"
              render={() => {
                return <CardComponent />;
              }}
            />
            <Route
              exact
              path="/termsConditions"
              render={() => {
                return <TermsConditions />;
              }}
            />
          </Switch>
          <Footer />
        </div>
      </CategoriesProvider>
    </MyProvider>
  );
}

export default withRouter(App);
