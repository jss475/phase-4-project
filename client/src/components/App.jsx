import { useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import User from "./User";
import Players from "./Players";
import BetsContainer from "./BetsContainer";
import AddMoney from "./AddMoney";

function App() {
  const [isLoggedin, setLoggedin] = useState(() => {
    const loggedin = localStorage.getItem("loggedin");
    return loggedin ? true : false;
  });

  const handleLogin = (val) => {
    setLoggedin(val);
    val
      ? localStorage.setItem("loggedin", JSON.stringify(true))
      : localStorage.clear();
  };

  return (
    <div className="App">
      <Header isLoggedin={isLoggedin} handleLogin={handleLogin} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            {isLoggedin ? <Redirect to="/user" /> : "Welcome to our home page"}
          </Route>
          <Route exact path="/about">
            about
          </Route>
          <Route exact path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup handleLogin={handleLogin} />
          </Route>
          <Route exact path="/user">
            <User handleLogin={handleLogin} />
          </Route>
          <Route exact path="/players">
            <Players />
          </Route>
          <Route exact path="/players/:id">
            <Players />
          </Route>
          <Route exact path="/bets">
            <BetsContainer />
          </Route>
          <Route exact path="/bets/:id">
            <BetsContainer />
          </Route>
          <Route exact path="/add-money">
            <AddMoney />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
