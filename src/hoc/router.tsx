import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import React from 'react'

export const withRouter: RouterHOC = Component => props => {
  return (
    <Router>
      <Component {...props} />
    </Router>
  )
}

export const withSwitch: RouterHOC = Component => props => {
  return (
    <Router>
      <Switch>
        <Component {...props} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

type RouterHOC = <T extends object>(
  Component: React.ComponentType<T>
) => React.FC<T>
