import { useQuery, useSubscription } from "@apollo/client";
import { FIND_CURRENTUSER, FIND_CURRENTUSER_SUB } from "../../graphql";
import React, { useEffect, useState } from "react";

import { getAuthenticationToken } from "@/lib/auth/state";

// import { isAllServers, isEdenStaff } from "../../data";
// import { isAllServers } from "../../data";
import { UserContext } from "./UserContext";
import jwt_decode from "jwt-decode";

type decodedType = {
  exp: number;
  iat: number;
  _id: string;
  discordName: string;
};
let decoded: decodedType = {
  exp: 0,
  iat: 0,
  _id: "",
  discordName: "",
};

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const token = getAuthenticationToken() as string;
  if (token) decoded = jwt_decode(token as string);
  const { _id } = decoded;

  const [memberServers, setMemberServers] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<any>();

  const { data: dataMember } = useQuery(FIND_CURRENTUSER, {
    variables: {
      fields: {
        _id: _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
    // ssr: false,
  });

  // if (dataMember?.findMember) console.log("dataMember", dataMember?.findMember);

  useSubscription(FIND_CURRENTUSER_SUB, {
    variables: {
      fields: {
        _id: _id,
      },
    },
    skip: !_id,
    context: { serviceName: "soilservice" },
  });

  // if (dataMember) console.log("dataMember", dataMember.findMember);

  useEffect(() => {
    if (dataMember && process.env.NODE_ENV === "development") {
      console.log(`==== current USER ====`);
      console.log(dataMember.findMember);
      console.log(`==== ----------- ====`);
    }
  }, [dataMember]);

  useEffect(() => {
    if (selectedServer && process.env.NODE_ENV === "development") {
      console.log(`==== current SERVER ====`);
      console.log(selectedServer);
      console.log(`==== ----------- ====`);
    }
  }, [selectedServer]);

  const injectContext = {
    currentUser: dataMember?.findMember || undefined,
    memberServers,
    selectedServer,
    setSelectedServer,
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
