import React from 'react';
import styles from './App.module.css';
import { ListContacts, ShowContact, EditContact } from './components';
import { DependencyWorker } from './workers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

export default class App extends React.Component {

  constructor() {
    super();
    this.factory = new DependencyWorker();
  }

  render() {

    const router = (
      <Router>
        <Switch>
          <Route
            exact path="/"
            render={(props) => (<ListContacts {...props} factory={this.factory} />)}
          />

          <Route
            exact path="/:id"
            render={(props) => (<ShowContact {...props} factory={this.factory} />)}
          />

          <Route
            path="/:id/edit"
            render={(props) => (<EditContact {...props} factory={this.factory} />)}
          />
        </Switch>
      </Router>
    );

    return (
      <div className={styles.root}>
        {router}
      </div>
    )
  }
}