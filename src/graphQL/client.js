import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

// VARIABLES
const halGraphQLEndPoint = 'https://api.hal.xyz/';
const HAL_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxNWI3ZWYzLTQ1NjYtNGQzYS1iMmI1LTFlZWVhOWQ3NGQ3ZiIsImVtYWlsIjoiZ2VuaXVzdml0YWxpa0BnbWFpbC5jb20iLCJkaXNwbGF5TmFtZSI6IlZpdGFsaWsgR2VuaXVzIiwiYWN0aW9uTW9udGhseUNhcCI6MTAwMCwiY291bnRlckFjdGlvbnNDdXJyZW50TW9udGgiOjAsInVzZXJUeXBlIjoiU1RBTkRBUkQiLCJjcmVhdGVkQXQiOiIyMDIwLTAyLTE0IDE5OjE5OjMwLjE3NzA0OSswMCIsImlhdCI6MTU4MTk3NDA5OH0.tHzHOUPkscumVuwL_ooeHCs256LRcN3WpIIM9ydUNyk';

const halClient = new ApolloClient({
  uri: halGraphQLEndPoint,
  cache,
  request: ((operation) => {
    const token = HAL_TOKEN;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }),
});

export default halClient;
