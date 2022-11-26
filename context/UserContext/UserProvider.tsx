import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { FIND_CURRENTUSER, FIND_CURRENTUSER_SUB } from "../../graphql";
import { Members, Mutation } from "../../apollo/generated/graphqlEden";
// import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// import { isAllServers, isEdenStaff } from "../../data";
// import { isAllServers } from "../../data";
import { UserContext } from "./UserContext";

// const findMutualGuilds = async () => {
//   const response = await fetch(encodeURI("/api/discord/fetchMutualGuilds"), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   return response.json();
// };

// const findMember = async () => {
//   const response = await fetch(encodeURI(`/api/discord/fetchMember`), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   return response.json();
// };

// const ADD_NEW_MEMBER = gql`
//   mutation AddNewMember($fields: addNewMemberInput!) {
//     addNewMember(fields: $fields) {
//       _id
//       discordAvatar
//       discordName
//       discriminator
//     }
//   }
// `;

// const UPDATE_MEMBER = gql`
//   mutation ($fields: updateMemberInput!) {
//     updateMember(fields: $fields) {
//       _id
//     }
//   }
// `;

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // const { data: session } = useSession();

  // const { id } = session?.user || { id: null };

  const id = null;
  const discordName = `waxy`;

  const [memberFound, setMemberFound] = useState(false);
  const [memberServers, setMemberServers] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<any>();

  // const [addNewMember, {}] = useMutation(ADD_NEW_MEMBER, {
  //   onCompleted({ addNewMember }: Mutation) {
  //     if (!addNewMember) console.log("addNewMember is null");
  //     // console.log("addNewMember", addNewMember);
  //     setMemberFound(true);
  //     refetch();
  //   },
  //   onError() {
  //     // console.log("error", error);
  //     refetch();
  //   },
  // });

  // const [updateMember, {}] = useMutation(UPDATE_MEMBER, {
  //   onCompleted({ updateMember }: Mutation) {
  //     if (!updateMember) console.log("updateMember is null");
  //     // console.log("updateMember", updateMember);
  //   },
  // });

  const { data: dataMember, refetch } = useQuery(FIND_CURRENTUSER, {
    variables: {
      fields: {
        // _id: id,
        discordName: discordName,
      },
    },
    skip: !discordName,
    // context: { serviceName: "soilservice" },
    ssr: false,
    onCompleted: async (data) => {
      // console.log("data", data);
      // if (!data.findMember) {
      //   await findMember()
      //     .then((member) => {
      //       // console.log("member NOT found", member.member);
      //       // addNewMember({
      //       //   variables: {
      //       //     fields: {
      //       //       _id: session?.user?.id,
      //       //       discordName: session?.user?.name,
      //       //       discordAvatar: session?.user?.image,
      //       //       discriminator: member?.member?.discriminator || "",
      //       //     },
      //       //   },
      //       // });
      //     })
      //     .catch((err) => {
      //       console.log("err", err);
      //     });
      // } else {
      //   setMemberFound(true);
      // }
    },
  });

  // if (dataMember?.findMember) console.log("dataMember", dataMember?.findMember);

  useSubscription(FIND_CURRENTUSER_SUB, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id || !memberFound,
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
    memberFound,
    setCurrentUser: (user: Members) => {
      console.log("setCurrentUser", user);
      // injectContext.currentUser = user;
    },
    refechProfile: () => refetch,
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
