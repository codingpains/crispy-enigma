import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PeopleTable, connectPeopleTable } from '../people-table';

import './style.scss';

const App = () => (
  <React.Fragment>
    <header>
      <div className="container">
        <h1>Crispy Enigma</h1>
      </div>
    </header>
    <div className="body">
      <div className="container">
        <Router>
          <Route path="/:filter?" component={connectPeopleTable(PeopleTable)} />
        </Router>
      </div>
    </div>
    <footer>
    </footer>
  </React.Fragment>
);


export default App;
