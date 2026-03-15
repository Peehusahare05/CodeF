const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/$/,
  "",
);

function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path}`;
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    credentials: "include",
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  return response;
}
