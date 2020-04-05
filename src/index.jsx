import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// GraphQL
import { ApolloProvider } from '@apollo/react-hooks';
import halClient from './graphQL/client';

// Application
import App from './components/App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={halClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
