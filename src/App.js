import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './components/Header/Header';

const routes = [
  {
    path: '/',
    getComponent: () => {
      return import(/* webpackChunkName: "HomeLayout" */ './layouts/HomeLayout').then(m => m.default)
    }
  }
]

const getAsyncRoutes = () => {
  return routes.map(route =>
    <AsyncRoute path={route.path} getComponent={route.getComponent}/>
  );
}

const App = url => {
  return (
    <div>
      <Header />
      <Router {...(url || {})}>
        {getAsyncRoutes()}
      </Router>
    </div>
  );
}

export default App;
