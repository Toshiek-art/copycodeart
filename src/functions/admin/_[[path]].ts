// functions/admin/[[path]].ts
function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
  });
}


export const onRequest: PagesFunction = async ({ request, env, next }) => {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Basic ")) return unauthorized();

  try {
    const base64 = auth.slice("Basic ".length);
    const decoded = atob(base64); // "user:pass"
    const [user, ...rest] = decoded.split(":");
    const pass = rest.join(":"); // gestisce password con i due punti

    const expectedUser = (env.ADMIN_USER || "").trim();
    const expectedPass = (env.ADMIN_PASS || "").trim();

    if (user === expectedUser && pass === expectedPass) {
      return next();
    }
  } catch (_) {
    // ignore
  }
  return unauthorized();
};
