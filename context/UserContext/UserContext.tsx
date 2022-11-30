import { Maybe, Members, ServerTemplate } from "@/apollo/generated/graphqlEden";
import { createContext, Dispatch } from "react";

type userProfile = Members;

export interface UserContextType {
  currentUser?: userProfile;
  memberServers: any;
  selectedServer: Maybe<ServerTemplate>;
  setSelectedServer: Dispatch<string>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  memberServers: undefined,
  selectedServer: {},
  // eslint-disable-next-line no-empty-function
  setSelectedServer: () => {},
});
