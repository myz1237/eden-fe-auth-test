import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setAuthenticationToken } from "@/lib/auth/state";

import { NEXT_PUBLIC_CALLBACK_URL, NEXT_PUBLIC_API_URL } from "../../constants";

const CallbackPage: NextPage = ({ token }: any) => {
  const router = useRouter();

  // console.log("token", token);

  useEffect(() => {
    if (token) {
      setAuthenticationToken({
        token: { accessToken: token, refreshToken: `` },
      });
      router.push("/profile");
    }
  }, [router, token]);

  return (
    <div>
      <main>
        <p>Authenticating....</p>
      </main>
    </div>
  );
};

export default CallbackPage;

import { IncomingMessage, ServerResponse } from "http";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
export async function getServerSideProps(ctx: {
  query: any;
  req: IncomingMessage;
  res: ServerResponse;
}) {
  console.log(" query ====>  ", ctx.query);
  const { code } = ctx.query;
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
}
