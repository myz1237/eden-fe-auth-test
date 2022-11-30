import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { setAuthenticationToken } from "@/lib/auth/state";

import { NEXT_PUBLIC_CALLBACK_URL, NEXT_PUBLIC_API_URL } from "../../constants";

import context from "../_app";

const CallbackPage: NextPage = ({ token }: any) => {
  const router = useRouter();
  const { code } = router.query;

  // console.log("token", token);

  useEffect(() => {
    if (token) {
      setAuthenticationToken({
        token: { accessToken: token, refreshToken: `` },
      });
      // setUser(token);
      // navigate("/dashboard");
    }
  }, [token]);

  useEffect(() => {
    if (code) {
      console.log(code);
      // router.push("/profile");
    }
  }, []);

  return (
    <div>
      <main>
        <p>Authenticating....</p>
      </main>
    </div>
  );
};

export default CallbackPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("context", context.query);
  const { code } = context.query;
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  const token = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      redirect_uri: NEXT_PUBLIC_CALLBACK_URL,
    }),
  })
    .then((res) => res.json())
    .then(({ discord_user, eden_user, token }) => {
      console.log({ discord_user, eden_user });
      // console.log("token", token);
      return token;
    });

  return {
    props: {
      token: token || ``,
    },
  };
};
