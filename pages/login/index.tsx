import type { NextPage } from "next";

const LoginPage: NextPage = () => {
  return <main>this is the login page</main>;
};

export default LoginPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  query: any;
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const { redirect } = ctx.query;

  let redirectUrl = "/auth-only";

  if (redirect && redirect.startsWith("_next")) {
    redirectUrl = "/auth-only";
  } else if (redirect) {
    redirectUrl = redirect;
  }

  if (session) {
    return {
      redirect: {
        destination: redirectUrl ? `/${redirectUrl}` : `/auth-only`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
