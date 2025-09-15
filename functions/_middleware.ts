// functions/_middleware.ts
import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";

export const onRequest: PagesFunction = async (ctx) => {
  const { request, env } = ctx;
  const url = new URL(request.url);

  // Applichiamo il gate solo a /admin*
  if (!url.pathname.startsWith("/admin")) return ctx.next();

  // Whitelist per pagine pubbliche/di servizio
  if (url.pathname.startsWith("/admin/login") || url.pathname.startsWith("/admin/_debug") || url.pathname.startsWith("/admin/logout")) {
    return ctx.next();
  }

  // Se non hai ancora il token di Access → vai alla pagina login carina
  const hasJwtHeader = request.headers.get("CF-Access-Jwt-Assertion");
  const hasJwtCookie = (request.headers.get("Cookie") || "").includes("CF_Authorization=");
  if (!hasJwtHeader && !hasJwtCookie) {
    return new Response(null, { status: 302, headers: { Location: "/admin/login" } });
  }

  // Se il token c'è, validalo davvero (dominio team + AUD dell'app)
  const access = cloudflareAccessPlugin({
    domain: env.CF_ACCESS_TEAM_DOMAIN as string,
    aud: env.CF_ACCESS_AUD as string,
  });

  // il plugin risponde 403 se il token non va bene; altrimenti prosegue
  // @ts-ignore - il plugin è un PagesFunction
  return access(ctx);
};
