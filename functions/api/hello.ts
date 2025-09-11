export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ message: "Hello from CopyCodeArt API" }), {
    headers: { "Content-Type": "application/json" }
  });
};
