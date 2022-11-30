import styles from "../styles/Home.module.css";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Mutation } from "@/apollo/generated/graphqlEden";

const SET_NEW_TEAM = gql`
  mutation ($fields: createNewTeamInput!) {
    createNewTeam(fields: $fields) {
      _id
      name
      description
      champion {
        _id
        discordName
      }
      projects {
        _id
        title
      }
      categoryDiscordlD
      channelGeneralDiscordID
      forumDiscordID
    }
  }
`;

export const FIND_PROJECT = gql`
  query ($fields: findProjectInput) {
    findProject(fields: $fields) {
      _id
      title
      garden_teams {
        _id
        name
        description
      }
    }
  }
`;

export const EditGardenTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const projectId = `6377a2e2def17f6938cb120f`;
  const teamId = `6377a53fdef17f6938cb1239`;

  const { data: dataProject, refetch: refetchProject } = useQuery(
    FIND_PROJECT,
    {
      variables: {
        fields: {
          _id: projectId,
        },
      },
      skip: !projectId,
      context: { serviceName: "soilservice" },
    }
  );

  //   if (dataProject) console.log("dataProject", dataProject?.findProject);

  const [addNewTeam, {}] = useMutation(SET_NEW_TEAM, {
    onCompleted({ createNewTeam }: Mutation) {
      if (!createNewTeam) console.log("createNewTeam is null");
      console.log("createNewTeam", createNewTeam);
      refetchProject();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleEditGardenTeam = () => {
    console.log("handleEditGardenTeam");
    addNewTeam({
      variables: {
        fields: {
          _id: teamId,
          name,
          description,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  return (
    <div>
      <h1>Edit Garden Team - createNewTeam</h1>
      <div className={styles.card}>
        <div>Project Id: {dataProject?.findProject?._id}</div>
        <div>Project Name: {dataProject?.findProject?.title}</div>

        <div>Team Id: {dataProject?.findProject?.garden_teams[0]?._id}</div>
        <div>Team Name: {dataProject?.findProject?.garden_teams[0]?.name}</div>
        <div>
          Team Description:
          {dataProject?.findProject?.garden_teams[0]?.description}
        </div>
      </div>
      <label className={styles.description}>Name: </label>
      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className={styles.description}>Description: </label>
      <input
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => handleEditGardenTeam()} className={styles.button}>
        edit team
      </button>
    </div>
  );
};
