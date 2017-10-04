import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />

      <Switch>
        <Route
          exact
          path="/create"
        />
        <Route
          exact
          path="/answer"
        />

        <Redirect to="/create" />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
