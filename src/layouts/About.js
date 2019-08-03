import { h } from 'preact';

function About () {
  return (
    <div>
      <h2>Preact Mobx Starter</h2>
      <p>Maintained by awaw00, <a href="https://github.com/awaw00/preact-mobx-starter">Github</a></p>
      <h3>Features</h3>
      <ul>
        <li>Preact: Fast, 3kB alternative to React, with the same ES2015 API.</li>
        <li>React router.</li>
        <li>Mobx state management.</li>
        <li>PostCSS, Less, CSS Modules.</li>
        <li>Webpack & HMR.</li>
      </ul>
    </div>
  );
}

export default About;
