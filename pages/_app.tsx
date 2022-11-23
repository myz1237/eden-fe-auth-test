import "../styles/globals.css";
import type { AppProps } from "next/app";

// import { createContext, useState } from "react";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// function MyApp({ Component, pageProps }: AppProps) {
//   const [user, setUser] = useState(null);
//   const context = createContext({
//     user,
//     setUser,
//   });

//   return (
//     <context.Provider
//       value={{
//         user,
//         setUser,
//       }}
//     >
//       <Component {...pageProps} />
//     </context.Provider>
//   );
// }

export default MyApp;
