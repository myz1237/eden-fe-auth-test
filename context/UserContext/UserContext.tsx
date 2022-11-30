import { Maybe, Members, ServerTemplate } from "@/apollo/generated/graphqlEden";
import { createContext, Dispatch } from "react";

export interface UserContextType {
  currentUser?: Maybe<Members>;
  setCurrentUser: Dispatch<Members>;
  clearCurrentUser: () => void;
  memberServers: any;
  selectedServer: Maybe<ServerTemplate>;
  setSelectedServer: Dispatch<string>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  // eslint-disable-next-line no-empty-function
  setCurrentUser: () => {},
  // eslint-disable-next-line no-empty-function
  clearCurrentUser: () => {},
  memberServers: undefined,
  selectedServer: {},
  // eslint-disable-next-line no-empty-function
  setSelectedServer: () => {},
});
