import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CalculatorConfig from '@/models/CalculatorConfig';
import { getAdminSession } from '@/lib/auth';
import { FallbackFees } from '@/data/visaCalculator';

const defaultQuestions = {
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

export async function GET() {
  try {
    await connectDB();
    let config = await CalculatorConfig.findOne().lean();
    if (!config) {
      // Seed default config
      config = await CalculatorConfig.create({
        fees: FallbackFees,
        questions: defaultQuestions
      });
    }
    return NextResponse.json({ fees: config.fees, questions: config.questions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fees, questions } = await req.json();
    if (!fees || !questions) {
      return NextResponse.json({ error: 'Missing fees or questions' }, { status: 400 });
    }

    await connectDB();
    let config = await CalculatorConfig.findOne();
    if (!config) {
      config = await CalculatorConfig.create({ fees, questions });
    } else {
      config.fees = fees;
      config.questions = questions;
      await config.save();
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
