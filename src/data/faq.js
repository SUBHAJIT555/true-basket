import contactInfo from "./contact-info";

/**
 * FAQ copy for True Basket — adjust here to update /faq in one place.
 */
export function getFaqItems() {
  const { companyName, email, phone } = contactInfo;

  return [
    {
      id: 1,
      question: "How do I get a quote for items in my cart?",
      answer: `Add products from the Shop to your cart, then go to Checkout, enter your contact details, and submit “Ask for quote.” We will review your list and reply by email—typically within 1–2 business days—with pricing, availability, and delivery options. You can also reach us at ${email}.`,
    },
    {
      id: 2,
      question: "Do I need an account to shop or request a quote?",
      answer:
        "No. You can browse, add items to your cart, and request a quote without registering. We use the email and phone you provide at checkout to send your quote and follow up.",
    },
    {
      id: 3,
      question: "Where do you deliver and how long does delivery take?",
      answer:
        "We focus on Mumbai and surrounding areas. Exact delivery days, time slots, and any delivery charges depend on your location and order size. We include those details in our quote response once we have your address.",
    },
    {
      id: 4,
      question: "How do you handle freshness for groceries and perishables?",
      answer:
        `${companyName} sources daily essentials and groceries with quality in mind. Cut-off times for same-day or next-day dispatch, and how fresh items are packed, are confirmed when we respond to your quote so you know what to expect.`,
    },
    {
      id: 5,
      question: "What about returns, refunds, or damaged items?",
      answer:
        "If something arrives wrong or damaged, contact us as soon as possible with your order details. Eligibility, timelines, and how to request a return or refund are explained on our Return Policy page—we will help you through the process.",
    },
    {
      id: 6,
      question: "How and when do I pay?",
      answer:
        "After you receive and accept our quote, we share payment methods and the amount to pay. Until then, adding items to your cart and requesting a quote does not charge your card—pricing is confirmed only after our quote.",
    },
    {
      id: 7,
      question: "How can I contact you directly?",
      answer: `Use the Contact page on this site, email ${email}, or call ${phone}. We are happy to help with quotes, delivery, and product questions.`,
    },
  ];
}
