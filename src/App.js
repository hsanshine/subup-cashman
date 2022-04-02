import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./UI/Layout";
import Account from "./components/Account";

import Withdraw from "./pages/user-pages/Withdraw";
import Intialize from "./pages/admin-pages/Intialize";
import Deposit from "./pages/user-pages/Deposit";

//TODO: to add some persistence
//TODO: get the notes from the backend; what notes are available
//TODO: get the user info from the backend , user.accountBalance
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/user" exact>
            <Account />
          </Route>
          <Route path="/user/withdraw" exact>
            <Withdraw />
          </Route>
          <Route path="/user/deposit" exact>
            <Deposit />
          </Route>
          <Route path="/admin" exact>
            <Intialize />
          </Route>
          <Route path="*">
            <Redirect to="/user" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
