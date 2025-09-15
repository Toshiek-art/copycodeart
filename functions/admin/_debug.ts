export const onRequest: PagesFunction = async ({ env }) => {
  const hasUser = !!(env.ADMIN_USER && env.ADMIN_USER.trim());
  const hasPass = !!(env.ADMIN_PASS && env.ADMIN_PASS.trim());
  return new Response(JSON.stringify({ hasUser, hasPass }), {
    headers: { "content-type": "application/json" },
  });
};
