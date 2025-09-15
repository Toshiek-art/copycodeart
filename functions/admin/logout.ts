// functions/admin/logout.ts
import { generateLogoutURL } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest: PagesFunction = async ({ env }) => {
  return new Response(null, {
    status: 302,
    headers: { Location: generateLogoutURL({ domain: env.CF_ACCESS_TEAM_DOMAIN as string }) },
  });
};
