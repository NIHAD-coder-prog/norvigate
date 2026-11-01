/**
 * Seller identity. Turkish distance-selling rules require the seller's identity and contact details on the site and in
 * the pre-contract information. EVERY required field must hold real data before checkout can open
 * (STORE_MODE=live is refused while any is empty). Nothing here is invented: all fields start as null.
 */
export interface BusinessIdentity {
  /** true if the seller is a registered company (then MERSIS is required); false for a sole trader; null = not decided yet. */
  isCompany: boolean | null;
  legalName: string | null; // full trade name as registered
  taxOffice: string | null; // vergi dairesi
  taxNumber: string | null; // vergi kimlik numarası
  mersis: string | null; // MERSİS number (companies)
  address: string | null; // registered address
  email: string | null; // customer contact email
  phone: string | null; // customer contact phone
  kepAddress: string | null; // KEP address, if any (optional)
  foodRegistration: string | null; // food business registration / approval reference
}

export const business: BusinessIdentity = {
  isCompany: null,
  legalName: null,
  taxOffice: null,
  taxNumber: null,
  mersis: null,
  address: null,
  email: null,
  phone: null,
  kepAddress: null,
  foodRegistration: null,
};

export const requiredBusinessFields: (keyof BusinessIdentity)[] = ["legalName", "taxOffice", "taxNumber", "address", "email", "phone", "foodRegistration"];
