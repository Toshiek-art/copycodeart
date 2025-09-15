// functions/admin/login.ts
import { generateLoginURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest: PagesFunction = async ({ env }) => {
  const url = generateLoginURL({
    redirectURL: "https://copycodeart.pages.dev/admin/", // dove torni dopo il login
    domain: env.CF_ACCESS_TEAM_DOMAIN as string,
    aud: env.CF_ACCESS_AUD as string,
  });
  return new Response(null, { status: 302, headers: { Location: url } });
};
