import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

// VARIABLES
const halGraphQLEndPoint = 'https://api.hal.xyz/';

const halClient = new ApolloClient({
  uri: halGraphQLEndPoint,
  cache,
  request: ((operation) => {
    const token = process.env.REACT_APP_HAL_TOKEN;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }),
});

export default halClient;
