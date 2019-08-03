import { h } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from 'layouts/Header';

const getHomeLayout = () => {
  return import(/* webpackChunkName: "HomeLayout" */ 'layouts/HomeLayout').then(m => m.default)
};

function App() {
  return (
    <div>
      <Header />
      <Router>
        <AsyncRoute path='/' getComponent={getHomeLayout}/>
      </Router>
    </div>
  );
}

export default App;
