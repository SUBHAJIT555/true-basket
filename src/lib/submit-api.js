/**
 * Shared submit API for contact, newsletter, CTA, and quote forms.
 * All forms POST to the same backend (e.g. public/api/submit.php).
 *
 * Set NEXT_PUBLIC_SUBMIT_API_URL to your full PHP endpoint (e.g. https://yoursite.com/api/submit.php).
 * If unset, uses /api/submit.php (same-origin).
 */
export function getSubmitApiUrl() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SUBMIT_API_URL) {
    return process.env.NEXT_PUBLIC_SUBMIT_API_URL;
  }
  return process.env.NEXT_PUBLIC_SUBMIT_API_URL || "/api/submit.php";
}

/**
 * POST JSON to the submit API. Returns { success, data } or { success: false, error }.
 */
export async function submitToApi(payload) {
  const url = getSubmitApiUrl();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { success: false, error: data.error || "Request failed." };
  }
  return { success: true, data };
}
