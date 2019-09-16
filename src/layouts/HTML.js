import { h } from 'preact';
import render from 'preact-render-to-string';
import App from '../App';

const Html = () => {
  return (
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Hello</title>
        <link rel="stylesheet" type="text/css" href="/static/main.css" />
      </head>
      <body id="root">
        <App />
      </body>
    </html>
  );
}

export default render(Html());
