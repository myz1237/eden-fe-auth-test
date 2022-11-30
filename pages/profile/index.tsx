import type { GetServerSideProps, NextPage } from "next";
import { useState, useContext } from "react";
import { UserContext } from "@/context";
import styles from "../../styles/Home.module.css";
import { gql, useMutation } from "@apollo/client";
import { Mutation } from "@/apollo/generated/graphqlEden";

const UPDATE_MEMBER = gql`
  mutation ($fields: updateMemberInput!) {
    updateMember(fields: $fields) {
      _id
    }
  }
`;

const ProfilePage: NextPage = () => {
  const { currentUser } = useContext(UserContext);
  const [bio, setBio] = useState("");
  // console.log(currentUser);

  const [updateMember, {}] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      console.log("UPDATED MEMBER CONFIRMED");
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSetBio = () => {
    console.log("handleSetBio");
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          bio: bio,
        },
      },
    });
  };

  return (
    <div>
      <main>
        <div className={styles.card}>
          <img
            className={styles.avatar}
            src={currentUser?.discordAvatar || ""}
            alt="avatar"
          />
          <div>{currentUser?.discordName}</div>
          <div>#{currentUser?.discriminator}</div>
          <div>Bio : {currentUser?.bio}</div>
        </div>
        <div>
          <label className={styles.description}>Bio: </label>
          <input
            className={styles.input}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button onClick={() => handleSetBio()} className={styles.button}>
            set bio
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
