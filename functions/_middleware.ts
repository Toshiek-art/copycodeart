// functions/_middleware.ts
export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);

  // Proteggiamo SOLO /admin
  if (!url.pathname.startsWith("/admin")) {
    return next();
  }

  // Se Cloudflare Access ha autenticato, aggiunge questo header
  const jwt = request.headers.get("CF-Access-Jwt-Assertion");
  if (!jwt) {
    // NIENTE header Basic qui: così sappiamo di essere sulla versione giusta
    return new Response("Unauthorized (CF Access)", { status: 401 });
  }

  return next();
};
