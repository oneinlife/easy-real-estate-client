import { h, render } from 'preact';
import App from './App';
import store from './store';
import { Provider } from 'mobx-react';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import DevTools from 'mobx-preact-devtools';

if (__DEV__) {
  /*  require('preact/devtools');
  
    const devToolsRoot = document.createElement('div');
    devToolsRoot.id = 'devtools';
    document.body.appendChild(devToolsRoot);
    render(<DevTools />, devToolsRoot);
    */
}
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

function bootstrap(App) {
  render((
    <Provider {...store}>
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </Provider >
  ), document.getElementById('root'));
}

bootstrap(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    bootstrap(require('./App').default);
  });
}
