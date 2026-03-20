import { apiFetch } from "../utils/api";

async function parseOrThrow(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }
  return data;
}

export async function generateSuggestions(payload = {}) {
  const response = await apiFetch("/api/suggestions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow(response);
}
