import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import StateSpecificRoute from './components/StateSpecificRoute'
import VaccinationRoute from './components/VaccinationRoute'
import AboutRoute from './components/AboutRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/state/:stateId" component={StateSpecificRoute} />
      <Route exact path="/vaccination" component={VaccinationRoute} />
      <Route exact path="/about" component={AboutRoute} />
      <Route exact path="/not-found" component={NotFoundRoute} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
