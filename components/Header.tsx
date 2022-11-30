import { useEffect, useState, useMemo, useContext } from "react";
import { UserContext } from "@/context";
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CALLBACK_URL } from "../constants";
import { removeAuthenticationToken } from "@/lib/auth/state";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

export const Header = () => {
  const router = useRouter();
  const { currentUser, clearCurrentUser } = useContext(UserContext);
  const [loginUrl, setLoginUrl] = useState("");
  let queryParams = useMemo(() => {
    return new URLSearchParams();
  }, []);
  queryParams.append("redirect_uri", NEXT_PUBLIC_CALLBACK_URL as string);

  useEffect(() => {
    fetch(`${NEXT_PUBLIC_API_URL}/auth/init?` + queryParams.toString())
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let { loginUrl } = data;
        setLoginUrl(loginUrl);
      });
  }, [queryParams]);

  const handleLogout = () => {
    // console.log("logout");
    removeAuthenticationToken();
    clearCurrentUser();
    // router.push("/login");
  };
  return (
    <div style={{ padding: "2rem" }}>
      {!currentUser && (
        <div>
          <a className={styles.button} href={loginUrl}>
            Login with Discord
          </a>
          <span className={styles.loggedOut}>STATUS: LOGGED OUT</span>
        </div>
      )}

      {currentUser && (
        <div>
          <button className={styles.button} onClick={() => handleLogout()}>
            log out
          </button>
          <span className={styles.loggedIn}>STATUS: Logged In</span>
        </div>
      )}
    </div>
  );
};
