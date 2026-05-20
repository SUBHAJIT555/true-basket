/**
 * Request for Quote API (Next.js stub).
 * Accepts JSON body with billing + cart; validates and returns success.
 * Replace with your PHP backend (e.g. public/api/submit.php) by setting
 * NEXT_PUBLIC_QUOTE_API_URL to your PHP endpoint; frontend will send FormData there.
 */
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const formType = body.formType;

  if (formType !== "quote") {
    return res.status(422).json({ error: "Invalid form type" });
  }

  const required = [
    "billing_first_name",
    "billing_last_name",
    "billing_email",
    "billing_phone",
    "billing_address",
    "billing_town",
  ];
  for (const key of required) {
    const val = body[key];
    if (val == null || String(val).trim() === "") {
      return res.status(422).json({ error: `Missing or empty: ${key}` });
    }
  }

  const email = String(body.billing_email).trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return res.status(422).json({ error: "Please enter a valid email address" });
  }

  const cartItems = body.cart_items;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(422).json({ error: "Cart is empty" });
  }

  // Stub: no email sent. For production use your PHP backend or add email here.
  return res.status(200).json({ success: true, message: "Message sent." });
}
