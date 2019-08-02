import { h } from 'preact';
import { Router } from 'preact-router';
import Header from 'layouts/Header';
import HomeLayout from 'layouts/HomeLayout';
import About from 'layouts/About';
import Count from 'layouts/Count';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <HomeLayout path='/' />
        <About path='/about' />
        <Count path='/count' />
      </Router>
    </div>
  );
}

export default App;
