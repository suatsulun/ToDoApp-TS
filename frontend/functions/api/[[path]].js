export async function onRequest({ request, env }) {
  if (!env.BACKEND_URL) {
    return new Response("BACKEND_URL is not configured", { status: 500 });
  }

  const url = new URL(request.url);
  const target = `${env.BACKEND_URL.replace(/\/$/, "")}${url.pathname}${url.search}`;

  return fetch(new Request(target, request));
}
