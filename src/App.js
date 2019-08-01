import preact from 'preact';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

function App () {
  return (
    <Router history={hashHistory} routes={routes} />
  );
}

export default App;
