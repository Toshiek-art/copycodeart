// functions/admin/[[path]].ts
export const onRequest: PagesFunction = async (ctx) => {
  const { request, env, next } = ctx;
  const header = request.headers.get("Authorization") || "";
  const expected = btoa(`${env.ADMIN_USER}:${env.ADMIN_PASS}`);
  if (header !== `Basic ${expected}`) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
    });
  }
  return next();
};

