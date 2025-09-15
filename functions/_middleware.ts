// functions/_middleware.ts
export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);

  // Applica solo a /admin*
  if (!url.pathname.startsWith("/admin")) return next();

  // Pagine pubbliche sotto /admin
  if (
    url.pathname.startsWith("/admin/login") ||
    url.pathname.startsWith("/admin/logout") ||
    url.pathname.startsWith("/admin/_debug")
  ) {
    return next();
  }

  // Se Access ha autenticato, avrai header o cookie
  const hasHeader = !!request.headers.get("CF-Access-Jwt-Assertion");
  const hasCookie = (request.headers.get("Cookie") || "").includes("CF_Authorization=");

  if (!hasHeader && !hasCookie) {
    // niente 401 brutto: mandiamo alla pagina carina
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }

  // già autenticato → passa
  return next();
};
