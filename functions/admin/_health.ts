export const onRequest: PagesFunction = async () => {
  return new Response("ok", { headers: { "content-type": "text/plain" } });
};
