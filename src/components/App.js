import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/">
              <LinkList />
            </Route>
            <Route exact path="/create">
              <CreateLink />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <p>Not Found 404</p>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
