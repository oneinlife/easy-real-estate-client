import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from 'layouts/Header';

const getHomeLayout = () => {
  return import(/* webpackChunkName: "HomeLayout" */ 'layouts/HomeLayout').then(m => m.default)
};
const getAbout = () => {
  return import(/* webpackChunkName: "About" */ 'layouts/About').then(m => m.default)
};
const getCount = () => {
  return import(/* webpackChunkName: "Count" */ 'layouts/Count').then(m => m.default)
};

function App() {
  return (
    <div>
      <Header />
      <Router>
        <AsyncRoute path='/' getComponent={getHomeLayout}/>
        <AsyncRoute path='/about' getComponent={getAbout}/>
        <AsyncRoute path='/count' getComponent={getCount} />
      </Router>
    </div>
  );
}

export default App;
