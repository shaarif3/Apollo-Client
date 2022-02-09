import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import React from 'react';
import AppRoutes from './AppRoutes/AppRoutes';

function App() {
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const httpLink = new HttpLink({
    uri: 'https://enigmatic-peak-64400.herokuapp.com/graphql',
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('token');

    // Use the setContext method to set the HTTP headers.
    if (token) {
      operation.setContext({ headers: { authorization: `Bearer ${token}` } });
    }

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
