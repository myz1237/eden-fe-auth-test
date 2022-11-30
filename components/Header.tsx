import { useEffect, useState, useMemo, useContext } from "react";
import { UserContext } from "@/context";
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CALLBACK_URL } from "../constants";
import { removeAuthenticationToken } from "@/lib/auth/state";

import styles from "../styles/Home.module.css";

export const Header = () => {
  const { currentUser } = useContext(UserContext);
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
    console.log("logout");
    removeAuthenticationToken();
  };
  return (
    <div>
      <a className={styles.button} href={loginUrl}>
        Login with Discord
      </a>
      <button className={styles.button} onClick={() => handleLogout()}>
        log out
      </button>
      {/* <span className={styles.loggedIn}>{currentUser && "Logged In"}</span>
      <span className={styles.loggedOut}>{!currentUser && "LOGGED OUT"}</span> */}
    </div>
  );
};
