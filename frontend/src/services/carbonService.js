import { apiFetch } from "../utils/api";

async function parseOrThrow(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }
  return data;
}

export async function calculateCarbon(payload) {
  const response = await apiFetch("/api/carbon/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow(response);
}

export async function saveCarbonResult(payload) {
  const response = await apiFetch("/api/carbon/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow(response);
}

export async function getCarbonHistory(page = 1, limit = 10) {
  const response = await apiFetch(
    `/api/carbon/history?page=${page}&limit=${limit}`,
  );
  return parseOrThrow(response);
}

export async function getCarbonStats() {
  const response = await apiFetch("/api/carbon/stats");
  return parseOrThrow(response);
}
