import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import styles from "../styles/Home.module.css";
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CALLBACK_URL } from "../constants";

const Home: NextPage = () => {
  const [loginUrl, setLoginUrl] = useState("");
  let queryParams = useMemo(() => {
    return new URLSearchParams();
  }, []);
  queryParams.append("redirect_uri", NEXT_PUBLIC_CALLBACK_URL as string);

  useEffect(() => {
    fetch(`${NEXT_PUBLIC_API_URL}/auth/init?` + queryParams.toString())
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let { loginUrl } = data;
        setLoginUrl(loginUrl);
      });
  }, [queryParams]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href={loginUrl}>Eden test Auth</a>
        </h1>

        <p className={``}>{loginUrl}</p>
      </main>
    </div>
  );
};

export default Home;
