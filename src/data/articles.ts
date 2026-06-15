export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string;
  image?: string;
  content?: string;
}

export const articles: Article[] = [
  {
    slug: 'how-to-apply-uae-family-visa-2026',
    title: 'How to Apply for a UAE Family Visa in 2026: Step-by-Step',
    excerpt: 'A clear, up-to-date walkthrough of UAE family visa eligibility, the documents you need, and each step of the 2026 application process.',
    category: 'UAE Family Visa',
    categorySlug: 'family-visa',
    author: 'Razeeb Abdulla',
    date: '8 Jun 2026',
    content: `Applying for a UAE family visa in 2026 is straightforward if you understand the requirements and follow the process step by step. This guide covers everything you need to know.

## Who Can Apply

To sponsor family members in the UAE, you must:
- Hold a valid UAE residence visa
- Meet the minimum salary requirements (AED 4,000/month or AED 3,000 + accommodation for spouse/children; AED 10,000/month for parents)
- Have suitable accommodation

## Required Documents

### For the Sponsor:
- Passport copy
- Emirates ID copy
- Labour contract or salary certificate
- Tenancy contract (Ejari)

### For the Dependent:
- Passport copy (6+ months validity)
- Passport-size photographs (white background)
- Attested marriage certificate (for spouse)
- Attested birth certificate (for children)

## Step-by-Step Process

1. **Document Preparation** — Gather and attest all required documents
2. **Family File Opening** — Open a family file with immigration
3. **Entry Permit Application** — Apply for the dependent's entry permit
4. **Medical Fitness Test** — Complete at an approved medical centre
5. **Emirates ID Application** — Submit biometrics and application
6. **Visa Stamping** — Final immigration approval
7. **Emirates ID Delivery** — Receive the residence card

## Processing Time

The entire process typically takes 5–10 working days, depending on document readiness and medical appointment availability.

## Costs

Use our free visa calculator to get an exact, itemized breakdown of all government fees for your specific situation.`,
  },
  {
    slug: 'dubai-golden-visa-property-owners-2026-guide',
    title: 'Dubai Golden Visa for Property Owners — The 2026 Complete Guide',
    excerpt: 'The Dubai Golden Visa for property owners is now simpler than ever — three documents, no bank NOC for mortgaged properties, husband-wife portfolio combination, and no age limit on sponsoring unmarried children.',
    category: 'Property Visa',
    categorySlug: 'property-visa',
    author: 'Razeeb Abdulla',
    date: '9 Jun 2026',
  },
  {
    slug: 'dubai-property-visa-bank-noc-no-longer-required',
    title: 'Bank NOC No Longer Required for Any Dubai Property Visa',
    excerpt: 'The bank NOC was the biggest source of delay on mortgaged-property visa applications — and from our desk this week, it\'s no longer being asked for.',
    category: 'Property Visa',
    categorySlug: 'property-visa',
    author: 'Razeeb Abdulla',
    date: '8 Jun 2026',
  },
  {
    slug: 'lost-emirates-id-replacement',
    title: 'Lost Your Emirates ID in the UAE? How to Apply for a Duplicate',
    excerpt: 'Lost your Emirates ID in the UAE? Here\'s how to apply for a duplicate through ICP or a typing centre — no police report needed in normal cases.',
    category: 'Emirates ID',
    categorySlug: 'emirates-id',
    author: 'Razeeb Abdulla',
    date: '10 Jun 2026',
  },
];

export const articleCategories = [
  { slug: 'all', label: 'All' },
  { slug: 'family-visa', label: 'UAE Family Visa' },
  { slug: 'property-visa', label: 'Property Visa' },
  { slug: 'emirates-id', label: 'Emirates ID' },
];
