const BASE = "https://codeforces.com/api";

let lastCall = 0;
const MIN_INTERVAL = 2000;

async function cfRequest(endpoint, params = {}) {
  const wait = MIN_INTERVAL - (Date.now() - lastCall);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCall = Date.now();

  const url = new URL(`${BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`CF HTTP error: ${res.status}`);

  const data = await res.json();
  if (data.status !== "OK") throw new Error(`CF API: ${data.comment}`);

  return data.result;
}

module.exports = { cfRequest };
