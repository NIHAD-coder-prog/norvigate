export interface LegalSection { h: string; p: string[] }
export interface LegalDoc { title: string; intro: string; sections: LegalSection[] }
export interface LegalPack {
  ui: {
    banner: string;
    notLawyer: string;
    drafted: string;
    toComplete: string;
    sellerTitle: string;
    sellerFields: { legalName: string; taxOffice: string; taxNumber: string; mersis: string; address: string; email: string; phone: string; kepAddress: string; foodRegistration: string };
    storeNotOpen: string;
    related: string;
  };
  privacy: LegalDoc;
  terms: LegalDoc;
  sales: LegalDoc;
  shipping: LegalDoc;
  cookies: LegalDoc;
}
