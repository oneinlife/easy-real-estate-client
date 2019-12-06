import { h, Fragment } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from 'components/Header/Header';

const getHomeLayout = () => {
  return import(/* webpackChunkName: "HomeLayout" */ 'layouts/HomeLayout').then(m => m.default)
};
const getSearchLayout = () => {
  return import(/* webpackChunkName: "SearchLayout" */ 'layouts/SearchLayout').then(m => m.default)
};

function App() {
  return (
    <>
      <Header/>
      <Router>
        <AsyncRoute path='/second' getComponent={getHomeLayout} />
        <AsyncRoute path='/' getComponent={getSearchLayout} />
      </Router>
    </>
  );
}

export default App;
