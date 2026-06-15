export type VisaCategory = 'family' | 'golden' | 'property' | 'newborn';
export type SponsorVisaType = 'twoyear' | 'golden' | 'retirement';
export type TwoYearType = 'employee' | 'investor';
export type LocationType = 'inside' | 'outside';
export type BirthCertLanguage = 'no' | 'yes';
export type HasFamilyFile = 'no' | 'yes';
export type MedicalType = 'normal' | 'vip';
export type ApplicationType = 'new' | 'renew';

export interface FeeItem {
  name: string;
  amount: number;
}

export interface CalculatorState {
  look: VisaCategory | null;
  visa: string | null; // e.g. 'golden', 'gvcompany', 'gvmanager', 'gvdeposit', 'famdep', 'famvisa', 'retirement', 'investor'
  sponsorVisa: SponsorVisaType | null;
  twoYearType: TwoYearType | null;
  loc: LocationType | null;
  hasFile: HasFamilyFile | null;
  medical: MedicalType | null;
  adults: number;
  children: number;
  nbSponsor: 'employee' | 'investor' | 'golden' | null;
  nbEnglish: BirthCertLanguage | null;
  appType: ApplicationType | null;
  family?: 'yes' | 'no' | null;
}

// Fallback prices matching FB/FB_EXTRA/FB_AMER from live spreadsheet
export const FallbackFees = {
  visa: {
    famdep: { label: "Family Dependent", eid: 354, sponsorItems: [] as FeeItem[], depItems: [] as FeeItem[], isDependentOnly: true },
    famvisa: { label: "Family Visa (2-Year)", eid: 354, sponsorItems: [] as FeeItem[], depItems: [] as FeeItem[], isDependentOnly: true },
    golden: { label: "10-Year Golden Visa", eid: 1154, sponsorItems: [{ name: "DLD & Admin Fees", amount: 5284 }, { name: "Immigration & Visa", amount: 2710 }], depItems: [{ name: "Immigration & Visa", amount: 2710 }] },
    gvcompany: { label: "Golden Visa — Company Owner", eid: 1154, sponsorItems: [{ name: "Immigration & Visa", amount: 2710 }], depItems: [{ name: "Immigration & Visa", amount: 2710 }] },
    gvmanager: { label: "Golden Visa — Manager / Executive", eid: 1154, sponsorItems: [{ name: "Immigration & Visa", amount: 2710 }], depItems: [{ name: "Immigration & Visa", amount: 2710 }] },
    gvdeposit: { label: "Golden Visa — Fixed Deposit", eid: 1154, sponsorItems: [{ name: "Immigration & Visa", amount: 2710 }], depItems: [{ name: "Immigration & Visa", amount: 2710 }] },
    retirement: { label: "5-Year Retirement Visa", eid: 654, sponsorItems: [{ name: "DLD & Admin Fees", amount: 3124 }, { name: "Immigration Fees", amount: 2260 }], depItems: [{ name: "Immigration Fees", amount: 2260 }] },
    investor: { label: "2-Year Investor Visa", eid: 354, sponsorItems: [{ name: "PCC", amount: 220 }, { name: "DLD Block & Recommendation", amount: 2020 }, { name: "DLD Trade License", amount: 4020 }, { name: "Establishment Card", amount: 575 }, { name: "Entry Permit", amount: 1126 }, { name: "Change Status", amount: 675 }, { name: "Visa Stamping", amount: 550 }], depItems: [] as FeeItem[] }
  },
  medical: { normal: 270, vip: 700 },
  familyFile: 203,
  entryInside: 1102,
  entryOutside: 452,
  changeStatus: 675,
  stampFamily: 410,
  fv: { eid: 354, entryInside: 989, entryOutside: 339, changeStatus: 630, stamp: 410 },
  newborn: { bcArabic: 70, bcEnglish: 70, mofa: 150, residency: 0, bcDelivery: 20, mofaDelivery: 25, goldenStamp: 1500 },
  amer: { medNormal: 320, medVip: 750, familyFile: 253, fvEntryInside: 1089, fvEntryOutside: 437, fvChangeStatus: 639, fvStamp: 510, fvEid: 385, eidInvestor: 385 }
};

export interface EstimateResult {
  title: string;
  subtitle: string;
  grandTotal: number;
  whatsappMsg: string;
  shareText: string;
  fees: FeeItem[];
  compareItems?: { name: string; diy: number; amer: number; qty: number }[];
  compareDiyTotal?: number;
  compareAmerTotal?: number;
  refundableDeposit?: number;
}

export function calculateEstimate(state: CalculatorState, fees: typeof FallbackFees = FallbackFees): EstimateResult {
  const vk = state.visa;

  if (state.look === 'newborn') {
    const nb = fees.newborn;
    const items: FeeItem[] = [];
    let grand = 0;
    const txt: string[] = [];
    const txtLine = (name: string, amt: number) => txt.push(`• ${name}: AED ${amt.toLocaleString()}`);

    const nbSponsorLabels: Record<string, string> = { golden: "Golden Visa", employee: "2-Year Employee Visa", investor: "2-Year Partner / Investor Visa" };
    const sponsorLabel = (state.nbSponsor ? nbSponsorLabels[state.nbSponsor] : null) || state.nbSponsor || '';

    // Birth Certificate Box
    items.push({ name: "Birth Certificate - Arabic (mandatory)", amount: nb.bcArabic });
    grand += nb.bcArabic;
    txtLine("Birth Certificate (Arabic)", nb.bcArabic);

    if (state.nbEnglish === 'yes') {
      items.push({ name: "Birth Certificate - English", amount: nb.bcEnglish });
      grand += nb.bcEnglish;
      txtLine("Birth Certificate (English)", nb.bcEnglish);
    }
    if (nb.bcDelivery > 0) {
      items.push({ name: "Birth Certificate Delivery", amount: nb.bcDelivery });
      grand += nb.bcDelivery;
      txtLine("Birth Certificate Delivery", nb.bcDelivery);
    }

    // MOFA Attestation Box
    items.push({ name: "MOFA Attestation", amount: nb.mofa });
    grand += nb.mofa;
    txtLine("MOFA Attestation", nb.mofa);

    if (nb.mofaDelivery > 0) {
      items.push({ name: "MOFA Delivery", amount: nb.mofaDelivery });
      grand += nb.mofaDelivery;
      txtLine("MOFA Delivery", nb.mofaDelivery);
    }

    // EID & Visa Stamping Box
    const eid = state.nbSponsor === 'golden' ? fees.visa.golden.eid : fees.visa.investor.eid;
    const eidName = state.nbSponsor === 'golden' ? "Emirates ID" : "Emirates ID";
    items.push({ name: `${eidName} (Newborn)`, amount: eid });
    grand += eid;
    txtLine(eidName, eid);

    let stamp = 0;
    let stampName = '';
    if (state.nbSponsor === 'golden') {
      stamp = nb.goldenStamp;
      stampName = "Visa Stamping (Golden Visa)";
    } else if (state.nbSponsor === 'employee') {
      stamp = fees.fv.stamp;
      stampName = "Visa Stamping (2-Year Employee)";
    } else {
      stamp = fees.stampFamily;
      stampName = "Visa Stamping (2-Year Partner / Investor)";
    }
    items.push({ name: stampName, amount: stamp });
    grand += stamp;
    txtLine(stampName, stamp);

    const whatsappMsg =
      `Hello FamilyVisa.ae 👋\n\n` +
      `I want to process a *Newborn Visa* for my baby.\n` +
      `The sponsor (parent) holds a *${sponsorLabel}*.\n` +
      `I got this government fees breakdown from your online calculator:\n\n` +
      `————————————————\n` +
      `*NEWBORN VISA*\nSponsor visa: ${sponsorLabel}\n\n` +
      `*BIRTH CERTIFICATE*\n` +
      txt.slice(0, state.nbEnglish === 'yes' ? (nb.bcDelivery > 0 ? 3 : 2) : (nb.bcDelivery > 0 ? 2 : 1)).join('\n') + `\n\n` +
      `*MOFA ATTESTATION*\n` +
      `• MOFA Attestation: AED ${nb.mofa}\n` +
      (nb.mofaDelivery > 0 ? `• MOFA Delivery: AED ${nb.mofaDelivery}\n` : '') + `\n` +
      `*RESIDENCY ISSUANCE*\n` +
      `• ${eidName}: AED ${eid}\n` +
      `• ${stampName}: AED ${stamp}\n` +
      `————————————————\n` +
      `*TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}*\n` +
      `Birth certificate: ${state.nbEnglish === 'yes' ? 'Arabic + English' : 'Arabic only'}\n\n` +
      `Please share your service charges and guide me on the next steps. Thank you!`;

    const shareText =
      `Check the estimate I got for my newborn's visa 👇\n\n` +
      `Newborn Visa (${sponsorLabel})\n` +
      `————————————————\n` +
      `Birth Certificate: Arabic${state.nbEnglish === 'yes' ? ' + English' : ''}\n` +
      `MOFA Attestation\n` +
      `Residency: EID + Stamping\n` +
      `————————————————\n` +
      `TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}\n` +
      `(government fees only — service charges are separate)\n\n` +
      `Check yours too using this free calculator:\n` +
      `https://familyvisa.ae`;

    return {
      title: "Newborn Visa Estimate",
      subtitle: `Sponsor: ${sponsorLabel}`,
      grandTotal: grand,
      whatsappMsg,
      shareText,
      fees: items
    };
  }

  // General Visa Estimation
  const isFamDep = (vk === 'famdep');
  const isFamVisa = (vk === 'famvisa');
  const isDepOnly = isFamDep || isFamVisa;

  const items: FeeItem[] = [];
  let grand = 0;
  const txt: string[] = [];
  const txtLine = (name: string, amt: number) => txt.push(`• ${name}: AED ${amt.toLocaleString()}`);

  const vInfo = fees.visa[vk as keyof typeof fees.visa] || fees.visa.famvisa;
  const isRenew = state.appType === 'renew';

  // 1. Sponsor Fees (Only for Sponsor flows)
  if (!isDepOnly) {
    let sponsorSum = 0;
    vInfo.sponsorItems.forEach(it => {
      items.push({ name: `Sponsor: ${it.name}`, amount: it.amount });
      sponsorSum += it.amount;
      txtLine(it.name, it.amount);
    });

    const spEidName = (vk === 'golden' || vk === 'gvcompany' || vk === 'gvmanager' || vk === 'gvdeposit') ? "Emirates ID"
                    : (vk === 'retirement') ? "Emirates ID"
                    : "Emirates ID";
    items.push({ name: `Sponsor: ${spEidName}`, amount: vInfo.eid });
    sponsorSum += vInfo.eid;
    txtLine(spEidName, vInfo.eid);

    const med = fees.medical[state.medical || 'normal'];
    const spMedName = state.medical === 'vip' ? "Medical (VIP)" : "Medical (Normal)";
    items.push({ name: `Sponsor: ${spMedName}`, amount: med });
    sponsorSum += med;
    txtLine(spMedName, med);

    grand += sponsorSum;
  }

  // 2. Family File Opening
  const hasDeps = isDepOnly ? (state.adults > 0 || state.children > 0)
                            : (state.family === 'yes' && (state.adults > 0 || state.children > 0));
  const addFamilyFile = isDepOnly ? (state.appType !== 'renew' && state.hasFile === 'no')
                                  : (state.family === 'yes' && (state.adults > 0 || state.children > 0));

  if (hasDeps && addFamilyFile) {
    items.push({ name: "Family File Opening (one-time)", amount: fees.familyFile });
    grand += fees.familyFile;
    txt.push("");
    txt.push("*FAMILY*");
    txtLine("Family File Opening", fees.familyFile);
  }

  // Function to build dependent items
  const getDepItems = (targetVk: string, forAdult: boolean): FeeItem[] => {
    let effVk = targetVk;
    if (targetVk === 'famdep') {
      effVk = state.sponsorVisa === 'twoyear' ? 'investor' : (state.sponsorVisa || 'golden');
    }
    const isRenewDep = state.appType === 'renew';
    const medLabel = state.medical === 'vip' ? "Medical (VIP)" : "Medical (Normal)";
    const depList: FeeItem[] = [];

    if (targetVk === 'famvisa') {
      const fv = fees.fv;
      if (!isRenewDep) {
        if (state.loc === 'inside') {
          depList.push({ name: "Entry Permit (Inside)", amount: fv.entryInside });
          depList.push({ name: "Change Status", amount: fv.changeStatus });
        } else {
          depList.push({ name: "Entry Permit (Outside)", amount: fv.entryOutside });
        }
      }
      if (forAdult) {
        depList.push({ name: medLabel, amount: fees.medical[state.medical || 'normal'] });
      }
      depList.push({ name: "Emirates ID", amount: fv.eid });
      depList.push({ name: "Visa Stamping", amount: fv.stamp });
      return depList;
    }

    if (effVk === 'investor') {
      if (!isRenewDep) {
        if (state.loc === 'inside') {
          depList.push({ name: "Entry Permit (Inside)", amount: fees.entryInside });
          depList.push({ name: "Change Status", amount: fees.changeStatus });
        } else {
          depList.push({ name: "Entry Permit (Outside)", amount: fees.entryOutside });
        }
      }
      if (forAdult) {
        depList.push({ name: medLabel, amount: fees.medical[state.medical || 'normal'] });
      }
      const investorV = fees.visa.investor;
      depList.push({ name: "Emirates ID", amount: investorV.eid });
      depList.push({ name: "Visa Stamping (Family)", amount: fees.stampFamily });
      return depList;
    }

    // Golden / Retirement dependents
    const ev = fees.visa[effVk as keyof typeof fees.visa] || fees.visa.golden;
    ev.depItems.forEach(it => depList.push({ name: it.name, amount: it.amount }));
    if (forAdult) {
      depList.push({ name: medLabel, amount: fees.medical[state.medical || 'normal'] });
    }
    depList.push({ name: "Emirates ID", amount: ev.eid });
    return depList;
  };

  // 3. Adults
  let adultSum = 0;
  if (hasDeps && state.adults > 0) {
    const adItems = getDepItems(vk || '', true);
    const adEach = adItems.reduce((acc, it) => acc + it.amount, 0);
    adultSum = adEach * state.adults;
    grand += adultSum;

    items.push({ name: `Adult Dependents (${state.adults}x)`, amount: adultSum });

    txt.push("");
    txt.push("*ADULT DEPENDENT (per person)*");
    adItems.forEach(it => txtLine(it.name, it.amount));
    txt.push(`${state.adults} × AED ${adEach.toLocaleString()} = AED ${adultSum.toLocaleString()}`);
  }

  // 4. Children
  let childSum = 0;
  if (hasDeps && state.children > 0) {
    const chItems = getDepItems(vk || '', false);
    const chEach = chItems.reduce((acc, it) => acc + it.amount, 0);
    childSum = chEach * state.children;
    grand += childSum;

    items.push({ name: `Child Dependents (${state.children}x)`, amount: childSum });

    txt.push("");
    txt.push("*CHILD DEPENDENT (per person)*");
    chItems.forEach(it => txtLine(it.name, it.amount));
    txt.push(`${state.children} × AED ${chEach.toLocaleString()} = AED ${childSum.toLocaleString()}`);
  }

  // 5. Compare Items (for 2-Year Employee dependent only)
  const compareItems: EstimateResult['compareItems'] = [];
  let compareDiyTotal = 0;
  let compareAmerTotal = 0;
  const hasCompare = (isFamVisa && (state.adults > 0 || state.children > 0));

  if (hasCompare) {
    const am = fees.amer;
    const pair = (diy: number, amerVal: number) => amerVal > 0 ? amerVal : diy;

    const addCompareLine = (name: string, diyVal: number, amerVal: number, qty: number) => {
      compareItems!.push({ name, diy: diyVal * qty, amer: pair(diyVal, amerVal) * qty, qty });
      compareDiyTotal += diyVal * qty;
      compareAmerTotal += pair(diyVal, amerVal) * qty;
    };

    if (state.appType !== 'renew' && state.hasFile === 'no') {
      addCompareLine("Family File Opening", fees.familyFile, am.familyFile, 1);
    }

    // Adults Compare
    if (state.adults > 0) {
      const fv = fees.fv;
      if (!isRenew) {
        if (state.loc === 'inside') {
          addCompareLine("Entry Permit (Inside)", fv.entryInside, am.fvEntryInside, state.adults);
          addCompareLine("Change Status", fv.changeStatus, am.fvChangeStatus, state.adults);
        } else {
          addCompareLine("Entry Permit (Outside)", fv.entryOutside, am.fvEntryOutside, state.adults);
        }
      }
      const medDiy = fees.medical[state.medical || 'normal'];
      const medAmer = state.medical === 'vip' ? am.medVip : am.medNormal;
      addCompareLine(state.medical === 'vip' ? "Medical (VIP)" : "Medical (Normal)", medDiy, medAmer, state.adults);
      addCompareLine("Emirates ID", fv.eid, am.fvEid, state.adults);
      addCompareLine("Visa Stamping", fv.stamp, am.fvStamp, state.adults);
    }

    // Children Compare
    if (state.children > 0) {
      const fv = fees.fv;
      if (!isRenew) {
        if (state.loc === 'inside') {
          addCompareLine("Entry Permit (Inside)", fv.entryInside, am.fvEntryInside, state.children);
          addCompareLine("Change Status", fv.changeStatus, am.fvChangeStatus, state.children);
        } else {
          addCompareLine("Entry Permit (Outside)", fv.entryOutside, am.fvEntryOutside, state.children);
        }
      }
      addCompareLine("Emirates ID", fv.eid, am.fvEid, state.children);
      addCompareLine("Visa Stamping", fv.stamp, am.fvStamp, state.children);
    }
  }

  // 6. Refundable Deposit Note
  const isInvestorPartner = (vk === 'investor') || (state.twoYearType === 'investor');
  let refundableDeposit = 0;
  if (isInvestorPartner && showsDeps(state)) {
    refundableDeposit = (state.adults + state.children) * 3000;
  }

  // 7. Prefilled WhatsApp message generator
  let whatsappMsg = '';
  const locNote = ((vk === 'investor' || vk === 'famdep' || vk === 'famvisa') && state.appType !== 'renew' && (state.adults > 0 || state.children > 0))
                ? `\nDependents location: ${state.loc === 'inside' ? 'Inside UAE' : 'Outside UAE'}`
                : "";

  if (isFamVisa) {
    const fileNoteFv = isRenew ? "Visa renewal (family file already exists)" : (state.hasFile === 'no' ? "First family file (opening fee included)" : "Family file already opened");
    whatsappMsg =
      `Hello FamilyVisa.ae 👋\n\n` +
      `I want to add my family as *dependents of a 2-Year Employee Visa* holder.\n` +
      `I got this government fees breakdown from your online calculator:\n\n` +
      `————————————————\n` +
      `*DEPENDENT OF 2-YEAR EMPLOYEE VISA — ${(state.appType || 'new').toUpperCase()}*\n\n` +
      txt.join('\n') + `\n` +
      `————————————————\n` +
      `*TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}*\n` +
      fileNoteFv +
      locNote + `\n\n` +
      `Please share your service charges and guide me on the next steps. Thank you!`;
  } else if (isFamDep) {
    const spLabel = state.sponsorVisa === 'twoyear' ? "2-Year Investor / Partner Visa"
                  : (fees.visa[state.sponsorVisa || 'golden']?.label || state.sponsorVisa || '');
    const fileNote = isRenew ? "Visa renewal (family file already exists)" : (state.hasFile === 'no' ? "First family file (opening fee included)" : "Family file already opened");
    whatsappMsg =
      `Hello FamilyVisa.ae 👋\n\n` +
      `I already have my UAE residence visa (*${spLabel}*) and I want to *add my family*.\n` +
      `I got this government fees breakdown from your online calculator:\n\n` +
      `————————————————\n` +
      `*FAMILY DEPENDENT — ${(state.appType || 'new').toUpperCase()}*\nSponsor visa: ${spLabel}\n\n` +
      txt.join('\n') + `\n` +
      `————————————————\n` +
      `*TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}*\n` +
      fileNote +
      locNote + `\n\n` +
      `Please share your service charges and guide me on the next steps. Thank you!`;
  } else {
    const processFor = (state.family === 'yes' && (state.adults > 0 || state.children > 0)) ? "myself and my family" : "myself";
    whatsappMsg =
      `Hello FamilyVisa.ae 👋\n\n` +
      `I want to process my *${vInfo.label}* for *${processFor}*.\n` +
      `I got this government fees breakdown from your online calculator:\n\n` +
      `————————————————\n` +
      `*SPONSOR — ${vInfo.label}*\n\n` +
      txt.join('\n') + `\n` +
      `————————————————\n` +
      `*TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}*` +
      locNote + `\n\n` +
      `Please share your service charges and guide me on the next steps. Thank you!`;
  }

  // 8. Share estimate text
  const shortLabel = { famdep: "Family Dependent", famvisa: "2-Yr Employee Dep", golden: "Golden Visa", gvcompany: "GV Company Owner", gvmanager: "GV Manager/Exec", gvdeposit: "GV Fixed Deposit", retirement: "Retirement Visa", investor: "Investor Visa" }[vk || ''] || vInfo.label;
  const parts: string[] = [];
  if (state.adults > 0) parts.push(`${state.adults}A`);
  if (state.children > 0) parts.push(`${state.children}C`);

  const shareWho = shortLabel + (parts.length ? ` (${parts.join(' + ')})` : '');
  const shareText =
    `Check the estimate I got for my visa 👇\n\n` +
    `${shareWho}\n` +
    `————————————————\n` +
    txt.join('\n').replace(/\*/g, '') + `\n` +
    `————————————————\n` +
    `TOTAL GOVERNMENT FEES: AED ${grand.toLocaleString()}\n` +
    `(government fees only — service charges are separate)\n\n` +
    `Check yours too using this free calculator:\n` +
    `https://familyvisa.ae`;

  return {
    title: shortLabel,
    subtitle: isDepOnly ? "Family Dependent Visa" : "Residency Visa Estimate",
    grandTotal: grand,
    whatsappMsg,
    shareText,
    fees: items,
    compareItems,
    compareDiyTotal,
    compareAmerTotal,
    refundableDeposit
  };
}

export function showsDeps(state: CalculatorState): boolean {
  return (state.look === 'family') ||
         (state.look === 'golden' && state.visa === 'famdep') ||
         (state.look === 'property' && (state.visa === 'propdep' || state.visa === 'famdep')) ||
         (state.family === 'yes' && (state.adults > 0 || state.children > 0));
}

export const defaultQuestions = {
  "1": {
    title: "What visa are you looking for?",
    description: "Choose a category to see the applicable government fees.",
    options: {
      family: { title: "Family / Dependent Visa", description: "Sponsor a family member on your visa" },
      golden: { title: "Golden Visa", description: "10-Year residency categories" },
      property: { title: "Property Visa", description: "Visas obtained through property" },
      newborn: { title: "Newborn Visa", description: "Add a newborn baby to the family file" }
    }
  },
  "2": {
    title: "Select Medical Type",
    description: "VIP medical processing is much faster but costs more.",
    options: {
      normal: { title: "Normal Medical", description: "Standard processing" },
      vip: { title: "VIP Medical", description: "Fast-track processing" }
    }
  },
  "3": {
    title: "Sponsoring family members?",
    description: "Would you like to calculate fees for family dependents as well?",
    options: {
      yes: { title: "Yes, I want to sponsor family", description: "Calculate total visa cost for sponsor + dependents" },
      no: { title: "No, sponsor visa only", description: "Show only sponsor application costs" }
    }
  },
  "5": {
    title: "Where is the dependent currently located?",
    description: "Dependent location determines entry permit and status change fees.",
    options: {
      inside: { title: "Inside UAE", description: "Requires status change fee inside the country" },
      outside: { title: "Outside UAE", description: "Standard entry permit printed for entry" }
    }
  },
  "7": {
    title: "Already opened family file?",
    description: "If you have sponsored family members before, your file is already open.",
    options: {
      yes: { title: "Yes, file is already open", description: "Skip the one-time family file fee (AED 203)" },
      no: { title: "No, first time sponsoring family", description: "Includes new family file opening fees" }
    }
  },
  "8": {
    title: "What is the sponsor's visa type?",
    description: "Dependent fees differ based on the sponsor's current residence visa.",
    options: {
      twoyear: { title: "Regular 2-Year Visa", description: "Investor / partner or employee visa holder" },
      golden: { title: "10-Year Golden Visa", description: "Dependent of a Golden Visa holder" },
      retirement: { title: "5-Year Retirement Visa", description: "Dependent of a Retirement Visa holder" }
    }
  },
  "10": {
    title: "Choose Golden Visa Category",
    description: "Select your specific 10-year Golden Visa application type.",
    options: {
      golden: { title: "10-Year Golden Visa", description: "General or other golden visa route" },
      gvcompany: { title: "Golden Visa — Company Owner", description: "Company establishment / owner route" },
      gvmanager: { title: "Golden Visa — Manager / Executive", description: "Executive/manager employment route" },
      gvdeposit: { title: "Golden Visa — Fixed Deposit", description: "Bank fixed deposit route" },
      famdep: { title: "Family Dependent Only", description: "Add dependents to an existing golden visa sponsor" }
    }
  },
  "11": {
    title: "What is the Sponsor type?",
    description: "Different rules apply to employees compared to business owners / investors.",
    options: {
      investor: { title: "Company Owner / Investor", description: "Holds a partner or investor visa" },
      employee: { title: "Employee", description: "Holds a corporate or government employee visa" }
    }
  },
  "12": {
    title: "Property Visa Category",
    description: "Select the visa category based on your property investment.",
    options: {
      golden: { title: "10-Year Golden Visa", description: "Property value of AED 2M or more" },
      retirement: { title: "5-Year Retirement Visa", description: "Property value of AED 1M or more (age 55+)" },
      investor: { title: "2-Year Investor Visa", description: "Property value of AED 750k or more" },
      propdep: { title: "Family Dependent Only", description: "Sponsor family members on your existing property visa" }
    }
  },
  "14": {
    title: "Select application type",
    description: "Choose whether you are processing a new visa or renewing an existing one.",
    options: {
      new: { title: "New Visa", description: "Brand new application" },
      renew: { title: "Renewal", description: "Renewing an existing visa before or after expiry" }
    }
  },
  "15": {
    title: "What is the sponsor parent's visa type?",
    description: "Choose the parent's visa category.",
    options: {
      golden: { title: "Golden Visa", description: "Golden visa parent sponsor" },
      employee: { title: "2-Year Employee Visa", description: "Standard corporate employee visa" },
      investor: { title: "2-Year Partner / Investor Visa", description: "Company partner/investor visa" }
    }
  },
  "16": {
    title: "English Birth Certificate?",
    description: "Do you require translation of the birth certificate from English to Arabic?",
    options: {
      no: { title: "Arabic birth certificate (or already translated)", description: "Arabic language format" },
      yes: { title: "English birth certificate (requires translation)", description: "English format requiring legal translation" }
    }
  },
  "17": {
    title: "Property Dependent Category",
    description: "Select your sponsor's property visa type.",
    options: {
      investor: { title: "2-Year Property Visa", description: "AED 750k+ property dependent" },
      golden: { title: "Golden Property Visa", description: "AED 2M+ golden property dependent" },
      retirement: { title: "Retirement Property Visa", description: "AED 1M+ retirement property dependent" }
    }
  }
};
