function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
  });
}

export const onRequest: PagesFunction = async ({ request, env, next }) => {
  const url = new URL(request.url);

  // WHITELIST: endpoint diagnostico senza auth
  if (url.pathname === "/admin/_debug") {
    return next();
  }

  const auth = request.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Basic ")) return unauthorized();

  try {
    const base64 = auth.slice(6).trim();
    const decoded = atob(base64);              // "user:pass"
    const [user, ...rest] = decoded.split(":");
    const pass = rest.join(":");               // supporta ':' nella password

    const expectedUser = (env.ADMIN_USER ?? "").trim();
    const expectedPass = (env.ADMIN_PASS ?? "").trim();

    // Log non sensibile
    console.log("[admin-auth]", { hasUser: !!expectedUser, hasPass: !!expectedPass });

    if (user === expectedUser && pass === expectedPass) {
      return next(); // autorizzato ⇒ prosegui con la route/asset vero
    }
  } catch (err) {
    console.log("[admin-auth] error", err);
  }

  return unauthorized();
};
