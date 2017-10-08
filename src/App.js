import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navbar from './components/Navbar'
import CreateQuestion from './pages/CreateQuestion'
import AnswerQuestion from './pages/AnswerQuestion'

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <div>
        <Navbar />

        <Switch>
          <Route
            exact
            path="/create"
            component={CreateQuestion}
          />
          <Route
            exact
            path="/answer"
            component={AnswerQuestion}
          />

          <Redirect to="/create" />
        </Switch>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
)

export default App
