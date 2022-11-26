import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import {
  getAuthenticationToken,
  // getRefreshToken,
  // setAuthenticationToken,
} from "@/lib/auth/state";

import { NEXT_PUBLIC_GRAPHQL_URL, NEXT_PUBLIC_GRAPHQL_WSS } from "../constants";

const httpLink = new HttpLink({ uri: NEXT_PUBLIC_GRAPHQL_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken() as string;
  //   const refreshToken = getRefreshToken() as string;

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  //   if (token && decoded.exp < Date.now() / 1000) {
  //     refreshAuth(refreshToken).then((res) => {
  //       operation.setContext({
  //         headers: {
  //           "x-access-token": token
  //             ? `Bearer ${res?.data?.refresh?.accessToken}`
  //             : "",
  //         },
  //       });
  //       setAuthenticationToken({ token: res.data.refresh });
  //     });
  //   }

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const apolloClient = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {},
        },
      },
    }),
  });
  return apolloClient;
};

// const edenPagination = (keyArgs: any) => {
//   return {
//     keyArgs: [keyArgs],
//     merge(existing: any, incoming: any) {
//       if (!existing) {
//         return incoming;
//       }
//       const existingItems = existing.items;
//       const incomingItems = incoming.items;

//       return {
//         items: existingItems.concat(incomingItems),
//         pageInfo: incoming.pageInfo,
//       };
//     },
//   };
// };
