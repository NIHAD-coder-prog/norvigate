import type { LegalPack } from "./types";

/**
 * DRAFTS. Written by an AI assistant, not by a lawyer. Every text below must be reviewed by a Turkish lawyer before the
 * site is public. Square brackets mark facts only the business can supply.
 */
export const en: LegalPack = {
  ui: {
    banner: "Draft pending review by a Turkish lawyer. This text is not legal advice and is not a statement that the business complies with any law.",
    notLawyer: "It was prepared by an AI assistant, which is not a lawyer.",
    drafted: "Draft prepared: 29 October 2026",
    toComplete: "[To be completed by the seller]",
    sellerTitle: "Seller details",
    sellerFields: { legalName: "Trade name", taxOffice: "Tax office", taxNumber: "Tax number", mersis: "MERSIS number", address: "Registered address", email: "Email", phone: "Phone", kepAddress: "KEP address", foodRegistration: "Food business registration" },
    storeNotOpen: "The online store is not open for sales yet. Until it opens, forms on this site record requests only; nothing is sold and no payment is taken.",
    related: "Related documents",
  },

  privacy: {
    title: "Privacy Policy and KVKK Notice",
    intro: "This notice explains what personal data NORVIGATE handles through this website, why, and what rights you have under the Turkish Personal Data Protection Law No. 6698 (KVKK). It also serves as the information duty towards data subjects.",
    sections: [
      { h: "1. Data controller", p: ["The data controller is the operator of NORVIGATE: [legal name, address, MERSIS or tax number and contact email, to be completed by the business before publication]."] },
      { h: "2. What we collect and how", p: [
        "Forms: only what you type into them, such as name, email, optional phone number, the message or request, and for order requests the products and quantities you chose. We also record the page language and the time of submission.",
        "Orders (only when online checkout is open): name, surname, email, phone, delivery address, the order contents and amounts, and an identity number if the payment provider requires one. You pay on the payment provider's own page; card details never reach NORVIGATE.",
        "Technical data: the server may log technical request information for security and fault finding. Your IP address is not saved with form submissions or orders. It is used briefly in server memory to limit abuse (rate limiting) and, at checkout, it is passed to the payment provider, which requires it.",
      ] },
      { h: "3. Purposes and legal grounds", p: [
        "To answer enquiries and handle requests: your explicit consent given when you tick the consent box on a form, and steps needed before entering into a contract.",
        "To process and deliver orders and meet accounting and tax duties: performance of a contract, and legal obligations.",
        "To keep the site secure and prevent abuse: the controller's legitimate interest.",
        "[The final list of grounds under KVKK Articles 5 and 6 is to be confirmed by the lawyer.]",
      ] },
      { h: "4. Who receives your data", p: [
        "Hosting and infrastructure provider: [name and country, to be completed].",
        "Payment provider (only when online checkout is open): [iyzico or the provider chosen, to be completed].",
        "Delivery company (only for shipped orders): [carrier, to be completed].",
        "Exchange rates are fetched by our server from a public rate service and do not include your personal data. The weather box on the Istanbul page asks Open-Meteo for the current weather from your browser, so Open-Meteo can see your IP address as it would on any web request.",
        "Data is not sold. Transfers abroad, including hosting outside Türkiye, must be assessed under KVKK Article 9. [To be completed with the lawyer.]",
      ] },
      { h: "5. Retention", p: ["Enquiries are kept as long as needed to answer them and for a reasonable period afterwards. [Exact periods to be set by the business.] Order and invoice records are kept for the periods required by Turkish commercial and tax law. [Periods to be confirmed by the lawyer.]"] },
      { h: "6. Your rights", p: [
        "Under KVKK Article 11 you can ask whether your data is processed, ask for information about it, learn the purposes and whether they are met, learn who receives it, ask for correction, ask for deletion or destruction, ask that these steps be notified to recipients, object to a result produced solely by automated analysis, and claim compensation for loss caused by unlawful processing.",
        "To apply, write to the contact address in section 1 with your name and a way to reach you. The controller must answer within 30 days. You may also complain to the Personal Data Protection Board.",
      ] },
      { h: "7. Registration duty", p: ["Whether the operator must register with the Data Controllers Registry (VERBİS) depends on its size and the data it handles. [To be confirmed by the lawyer.]"] },
      { h: "8. Changes", p: ["We will update this notice when the way we handle data changes, and show the date of the latest version."] },
    ],
  },

  terms: {
    title: "Terms of Use",
    intro: "These terms set the rules for using the NORVIGATE website. Online sales have their own terms: see the Terms of Sale.",
    sections: [
      { h: "1. About the site", p: ["NORVIGATE is a city-gateway platform. Its first gate is Istanbul. Content marked Sample is an illustration, not a real provider, price, product or availability."] },
      { h: "2. Requests are not contracts", p: ["Forms record requests and enquiries. A request is not a booking, order or contract. Nothing is confirmed until NORVIGATE or a provider confirms it separately and clearly."] },
      { h: "3. Third-party services and links", p: ["Flights, hotels and other links lead to independent sites. NORVIGATE does not control their content, prices or availability. Check dates and conditions on those sites before you pay."] },
      { h: "4. Your submissions", p: ["Give accurate information and only information you have the right to share. Do not send unlawful, misleading or abusive content, or other people's personal data without their permission."] },
      { h: "5. Listings", p: ["Asking to be listed does not guarantee publication. NORVIGATE may decline, edit or remove a listing."] },
      { h: "6. Information and conversions", p: ["Prayer times are calculated from a standard method and may differ slightly from your local authority's table. Weather comes from a third party. Currency conversions are indicative daily reference rates, not an offer; the amount a bank or payment provider charges may differ."] },
      { h: "7. Intellectual property", p: ["The NORVIGATE name, logo and artwork belong to their owner. Do not copy or reuse them without written permission. [Ownership wording to be confirmed.]"] },
      { h: "8. Liability", p: ["[Limits of liability and disclaimers to be drafted by the lawyer. They cannot exclude liability that Turkish law does not allow to be excluded, nor consumer rights.]"] },
      { h: "9. Changes and governing law", p: ["We may change these terms and will show the date. [Governing law and competent courts or consumer arbitration committees to be confirmed by the lawyer.]"] },
    ],
  },

  sales: {
    title: "Terms of Sale and Pre-contract Information",
    intro: "This text applies to purchases in the NORVIGATE online store once it is open. It is the pre-contract information required for distance contracts under Turkish consumer law (Law No. 6502 and the Distance Contracts Regulation). The buyer must be able to read it and confirm it before paying.",
    sections: [
      { h: "1. Seller", p: ["The seller's identity, address and contact details are in the table at the top of this page. The store does not open until they are complete."] },
      { h: "2. Goods", p: ["The main features of each product, including weight, ingredients, allergens, shelf life and storage, are on its product page. Check them and the label on the package. The allergen confirmation at checkout is mandatory."] },
      { h: "3. Prices and payment", p: ["Prices are in Turkish lira and include the taxes the seller is required to include. [Tax wording to be confirmed.] Delivery cost is calculated before you pay and shown separately. The total shown at payment is the total you pay. Payment is made on the payment provider's secure page; NORVIGATE does not receive your card details."] },
      { h: "4. Order and contract", p: ["The contract is formed when payment is confirmed and the order status shows Paid. The seller may cancel and refund an order it cannot fulfil, for example if stock is not available."] },
      { h: "5. Delivery", p: ["Delivery terms, times and destinations are in the Shipping and Returns page. Delivery is possible only to the destinations listed at checkout."] },
      { h: "6. Right of withdrawal", p: [
        "A consumer normally has 14 days from receiving goods to withdraw from a distance contract without giving a reason.",
        "The regulation excludes some goods from this right, including goods that spoil quickly or whose date can expire, and goods in sealed packaging that cannot be returned for health or hygiene reasons once opened. Food is likely to fall under these exclusions. [The lawyer must confirm which products are excluded, and the product pages must say so.]",
        "Where the right applies, notify the seller in writing within 14 days. The seller refunds within 14 days of the notice, using the same payment method. [Return shipping cost wording to be confirmed.]",
      ] },
      { h: "7. Defective or wrong goods", p: ["If goods arrive damaged, wrong or defective, contact the seller promptly with photos. Your statutory rights under Turkish consumer law are not limited by these terms."] },
      { h: "8. Complaints and disputes", p: ["Contact the seller first. A consumer may also apply to the Consumer Arbitration Committee or the Consumer Court at the place of residence or of the seller, within the monetary limits set each year. [Current limits and wording to be confirmed by the lawyer.]"] },
      { h: "9. Buyers outside Türkiye", p: ["Consumer law of the buyer's country may also apply. [The lawyer must advise on this and on the import rules for food in each destination.] The store only opens destinations the seller has checked."] },
      { h: "10. Personal data", p: ["Personal data is handled as described in the Privacy Policy and KVKK Notice."] },
    ],
  },

  shipping: {
    title: "Shipping and Returns",
    intro: "How orders are priced for delivery, how long they take, and what happens if something goes wrong. Figures marked as pending are placeholders that the seller must replace with real carrier quotes before the store opens.",
    sections: [
      { h: "1. Where we deliver", p: ["Only to the countries offered at checkout. The list is set by the seller after checking each destination's food import rules. If your country is not offered, we cannot take the order."] },
      { h: "2. Delivery cost", p: ["The cost depends on the destination and the total weight of the order including packaging. It is calculated by the server and shown before payment. [Rate table to be published once carrier quotes are confirmed.]"] },
      { h: "3. Delivery time", p: ["The estimate shown at checkout is a range of days from dispatch, not a guarantee. Customs checks outside Türkiye can add time. [Estimates to be confirmed with the carrier.]"] },
      { h: "4. Tracking", p: ["When an order ships, its status page shows the carrier and tracking number. Keep the private link you receive after payment: it is the only way to open the status page."] },
      { h: "5. Customs, duties and import rules", p: ["Food may be restricted or taxed on arrival. [Seller to state who pays duties and taxes for each destination.] A parcel refused or held by customs may not be refundable. [To be confirmed by the lawyer.]"] },
      { h: "6. Perishable food and returns", p: ["Because food can spoil, the right of withdrawal usually does not apply to it (see the Terms of Sale). [The lawyer must confirm.] If goods arrive damaged, spoiled or wrong, contact us within [number of days, to be decided] days of delivery with photos, and we will replace or refund as the law requires."] },
      { h: "7. Cancelling before dispatch", p: ["Contact us as soon as possible. If the order has not shipped it can be cancelled and refunded to the original payment method. [Timing to be confirmed.]"] },
    ],
  },

  cookies: {
    title: "Cookie Notice",
    intro: "NORVIGATE sets no advertising or analytics cookies and loads no third-party scripts. This notice lists the small items it does store on your device.",
    sections: [
      { h: "1. What is stored", p: [
        "NV_LOCALE (cookie, one year): remembers your chosen language. Strictly necessary for the language choice to work.",
        "nv_currency (browser storage): remembers the currency you choose for indicative prices.",
        "nv_cart_v1 (browser storage): keeps the items in your cart on your device. It is never sent to a server until you send an order request or check out.",
      ] },
      { h: "2. No tracking", p: ["There is no analytics, advertising pixel or social media embed. If any is added later, this notice will be updated and consent will be asked first where the law requires it."] },
      { h: "3. Third-party requests", p: ["The weather box on the Istanbul home page asks Open-Meteo for the current weather directly from your browser. That request does not set cookies, but the provider can see your IP address as for any web request. The payment provider's page, when online checkout is open, has its own notices."] },
      { h: "4. Your choices", p: ["You can delete the cookie and browser storage in your browser settings at any time. The site then forgets your language, currency and cart."] },
    ],
  },
};
