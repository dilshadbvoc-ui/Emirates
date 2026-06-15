"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, Users, Star, Building, Baby,
  FileText, ArrowRight, Share2, Check, Plus, Minus
} from 'lucide-react';
import {
  FallbackFees,
  defaultQuestions,
  calculateEstimate,
  type CalculatorState,
  type SponsorVisaType,
  type TwoYearType,
  type LocationType,
  type BirthCertLanguage,
  type HasFamilyFile,
  type MedicalType,
  type ApplicationType
} from '@/data/visaCalculator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  users: <Users size={20} />,
  star: <Star size={20} />,
  building: <Building size={20} />,
  baby: <Baby size={20} />,
};

const SHEETS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRyDtItFA9bHmLN-hMr3ukJZFmV65VIj6EkTZP_null1GVXdOlAelDKcAT_7hxHyNBRBK9Mb5E7W_LP/pub?output=csv";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let f = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const nx = text[i + 1];
    if (q) {
      if (ch === '"' && nx === '"') {
        f += '"';
        i++;
      } else if (ch === '"') {
        q = false;
      } else {
        f += ch;
      }
    } else {
      if (ch === '"') {
        q = true;
      } else if (ch === ',') {
        row.push(f);
        f = "";
      } else if (ch === '\n') {
        row.push(f);
        rows.push(row);
        row = [];
        f = "";
      } else if (ch === '\r') {
        // ignore
      } else {
        f += ch;
      }
    }
  }
  if (f.length || row.length) {
    row.push(f);
    rows.push(row);
  }
  return rows;
}

function durKey(d: string): 'investor' | 'retirement' | 'golden' | null {
  const s = d.trim();
  if (s === "2") return "investor";
  if (s === "5") return "retirement";
  if (s === "10") return "golden";
  return null;
}

export default function VisaCalculator({ isOpen, onClose }: Props) {
  const [fees, setFees] = useState<typeof FallbackFees>(FallbackFees);
  const [questions, setQuestions] = useState<typeof defaultQuestions>(defaultQuestions);
  const [state, setState] = useState<CalculatorState>({
    look: null,
    visa: null,
    sponsorVisa: null,
    twoYearType: null,
    loc: null,
    hasFile: null,
    medical: null,
    adults: 0,
    children: 0,
    nbSponsor: null,
    nbEnglish: null,
    appType: null,
    family: null
  });

  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [shareStatus, setShareStatus] = useState<string>('Copy Estimate Link');

  // Load config data on mount
  useEffect(() => {
    fetch('/api/calculator/config')
      .then(res => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then(data => {
        if (data.fees) setFees(data.fees);
        if (data.questions) setQuestions(data.questions);
      })
      .catch(err => {
        console.log("Failed to load DB config, falling back to sheets:", err);
        fetch(SHEETS_URL, { cache: 'no-store' })
          .then(res => {
            if (!res.ok) throw new Error("HTTP error");
            return res.text();
          })
          .then(csvText => {
            const rows = parseCSV(csvText);
            if (rows.length < 2) return;
            const h = rows[0].map(x => x.trim().toLowerCase());
            const iVisa = h.findIndex(x => x.indexOf("visa type") > -1);
            const iDur = h.findIndex(x => x.indexOf("duration") > -1);
            const iItem = h.findIndex(x => x.indexOf("item") > -1);
            const iAmt = h.findIndex(x => x.indexOf("amount") > -1);
            const iAmer = h.findIndex(x => x.indexOf("amer") > -1);

            const iv = iVisa < 0 ? 1 : iVisa;
            const idur = iDur < 0 ? 2 : iDur;
            const iit = iItem < 0 ? 3 : iItem;
            const iamt = iAmt < 0 ? 4 : iAmt;
            const iame = iAmer < 0 ? 5 : iAmer;

            const out = JSON.parse(JSON.stringify(FallbackFees)) as typeof FallbackFees;

            for (let r = 1; r < rows.length; r++) {
              const c = rows[r];
              if (!c || c.length < 2) continue;
              const vtype = (c[iv] || "").trim();
              const item = (c[iit] || "").trim();
              const amt = parseFloat((c[iamt] || "").toString().replace(/[^0-9.]/g, ""));
              if (!item || isNaN(amt)) continue;
              let amer = parseFloat((c[iame] || "").toString().replace(/[^0-9.]/g, ""));
              if (isNaN(amer)) amer = 0;

              if (vtype.toLowerCase().indexOf("all visa") > -1) {
                if (/medical/i.test(item) && /normal/i.test(item)) { out.medical.normal = amt; out.amer.medNormal = amer; }
                else if (/medical/i.test(item) && /vip/i.test(item)) { out.medical.vip = amt; out.amer.medVip = amer; }
                else if (/family\s*file/i.test(item)) { out.familyFile = amt; out.amer.familyFile = amer; }
                continue;
              }

              if (/family\s*visa/i.test(vtype)) {
                if (/entry\s*permit\s*inside/i.test(item)) { out.fv.entryInside = amt; out.amer.fvEntryInside = amer; }
                else if (/entry\s*permit\s*outside/i.test(item)) { out.fv.entryOutside = amt; out.amer.fvEntryOutside = amer; }
                else if (/change\s*status/i.test(item)) { out.fv.changeStatus = amt; out.amer.fvChangeStatus = amer; }
                else if (/visa\s*st[ao]mping/i.test(item)) { out.fv.stamp = amt; out.amer.fvStamp = amer; }
                else if (/emirates\s*id/i.test(item)) { out.fv.eid = amt; out.amer.fvEid = amer; }
                continue;
              }

              if (/new\s*born|newborn/i.test(vtype)) {
                if (/birth\s*cert/i.test(item) && /del[ei]ver/i.test(item)) { out.newborn.bcDelivery = amt; }
                else if (/mofa/i.test(item) && /del[ei]ver/i.test(item)) { out.newborn.mofaDelivery = amt; }
                else if (/birth\s*cert/i.test(item) && /arabic/i.test(item)) { out.newborn.bcArabic = amt; }
                else if (/birth\s*cert/i.test(item) && /engl/i.test(item)) { out.newborn.bcEnglish = amt; }
                else if (/mofa/i.test(item)) { out.newborn.mofa = amt; }
                else if (/residency\s*issuance/i.test(item)) { out.newborn.residency = amt; }
                else if (/golden/i.test(item) && /stamp/i.test(item)) { out.newborn.goldenStamp = amt; }
                continue;
              }

              const vkSheet = durKey(c[idur]);
              if (!vkSheet) continue;

              if (vkSheet === "investor") {
                if (/entry\s*permit\s*inside/i.test(item)) { out.entryInside = amt; continue; }
                if (/entry\s*permit\s*outside/i.test(item)) { out.entryOutside = amt; continue; }
                if (/family/i.test(item) && /st[ao]mping/i.test(item)) { out.stampFamily = amt; continue; }
              }

              if (/emirates\s*id/i.test(item)) {
                out.visa[vkSheet].eid = amt;
                if (vkSheet === "investor") out.amer.eidInvestor = amer;
                continue;
              }

              out.visa[vkSheet].sponsorItems.push({ name: item, amount: amt });
              if (vkSheet === "investor" && /change\s*status/i.test(item)) { out.changeStatus = amt; }
            }

            // Rebuild dynamic arrays
            ["golden", "retirement"].forEach(vkKey => {
              const key = vkKey as 'golden' | 'retirement';
              out.visa[key].depItems = out.visa[key].sponsorItems.filter(it => !/dld\s*&?\s*admin/i.test(it.name));
            });

            ["gvcompany", "gvmanager", "gvdeposit"].forEach(vkKey => {
              const key = vkKey as 'gvcompany' | 'gvmanager' | 'gvdeposit';
              out.visa[key].eid = out.visa.golden.eid;
              out.visa[key].sponsorItems = out.visa.golden.sponsorItems.filter(it => !/dld\s*&?\s*admin/i.test(it.name));
              out.visa[key].depItems = out.visa.golden.depItems;
            });

            out.visa.famdep.eid = out.visa.investor.eid;
            if (!out.fv.eid) out.fv.eid = out.visa.investor.eid;
            if (!out.amer.fvEid) out.amer.fvEid = out.amer.eidInvestor;
            out.visa.famvisa.eid = out.fv.eid;

            setFees(out);
          })
          .catch(err => console.log("Failed to load spreadsheet, using fallbacks:", err));
      });
  }, []);

  const reset = () => {
    setState({
      look: null,
      visa: null,
      sponsorVisa: null,
      twoYearType: null,
      loc: null,
      hasFile: null,
      medical: null,
      adults: 0,
      children: 0,
      nbSponsor: null,
      nbEnglish: null,
      appType: null,
      family: null
    });
    setCurrentScreen(1);
    setHistory([]);
    setShowCompare(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const navigateTo = (screenNum: number) => {
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screenNum);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHistory => prevHistory.slice(0, -1));
      setCurrentScreen(prev);
    }
  };

  // State sequences
  const getNextScreenFor = (scr: number, nextState: CalculatorState): number => {
    const look = nextState.look;

    if (look === 'family') {
      if (scr === 1) return 8; // sponsor visa type selection
      if (scr === 8) {
        return nextState.sponsorVisa === 'twoyear' ? 14 : 7; // if 2-year -> new/renew, else family file?
      }
      if (scr === 14) return 11; // 2-year sub-type (employee/investor)
      if (scr === 11) {
        return nextState.appType === 'renew' ? 7 : 5; // if renew -> family file, else inside/outside
      }
      if (scr === 5) return 7; // family file?
      if (scr === 7) return 4; // dependent count
      if (scr === 4) {
        return nextState.adults > 0 ? 2 : 6; // if adults > 0 -> medical, else results
      }
      if (scr === 2) return 6; // results
    }

    if (look === 'newborn') {
      if (scr === 1) return 15; // newborn sponsor parent type
      if (scr === 15) return 16; // birth certificate language
      if (scr === 16) return 6; // results
    }

    if (look === 'golden') {
      if (scr === 1) return 10; // golden visa category
      if (scr === 10) {
        if (nextState.visa === 'famdep') return 7; // dependent family file
        return 2; // sponsor medical
      }
      if (scr === 7) return 4; // dependent counts
      if (scr === 4 && nextState.visa === 'famdep') {
        return nextState.adults > 0 ? 2 : 6; // dependent medical or results
      }
      if (scr === 2 && nextState.visa !== 'famdep') return 3; // sponsor add family?
      if (scr === 3) {
        return nextState.family === 'yes' ? 4 : 6;
      }
      if (scr === 4) return 6; // sponsor results with family
      if (scr === 2 && nextState.visa === 'famdep') return 6; // dependent results
    }

    if (look === 'property') {
      if (scr === 1) return 12; // property category selection
      if (scr === 12) {
        if (nextState.visa === 'propdep') return 17; // dependent sub-menu
        return 2; // sponsor medical
      }
      if (scr === 17) {
        return nextState.sponsorVisa === 'twoyear' ? 14 : 7; // dependent details
      }
      if (scr === 14) return nextState.appType === 'renew' ? 7 : 5; // new/renew
      if (scr === 5) return 7; // inside/outside -> family file
      if (scr === 7) return 4; // count
      if (scr === 4 && nextState.visa === 'famdep') {
        return nextState.adults > 0 ? 2 : 6; // dependent medical
      }
      if (scr === 2 && nextState.visa === 'famdep') return 6; // dependent results
      if (scr === 2) return 3; // sponsor add family?
      if (scr === 3) {
        return nextState.family === 'yes' ? 4 : 6;
      }
      if (scr === 4) {
        return (nextState.family === 'yes' && nextState.visa === 'investor') ? 5 : 6; // sponsor investor family inside/outside
      }
      if (scr === 5) return 6; // sponsor investor results
    }

    return 6;
  };

  const handleSelection = (key: keyof CalculatorState, val: CalculatorState[keyof CalculatorState]) => {
    const nextState = { ...state, [key]: val };

    // Set side effects
    if (key === 'look' && val === 'family') {
      nextState.visa = 'famvisa';
    }
    if (key === 'sponsorVisa' && state.look === 'golden') {
      nextState.visa = 'famdep';
      nextState.appType = 'new';
    }
    if (key === 'sponsorVisa' && state.look === 'property') {
      nextState.visa = 'famdep';
      if (val !== 'twoyear') {
        nextState.appType = 'new';
      }
    }
    if (key === 'visa' && val !== 'propdep' && val !== 'famdep' && state.look === 'property') {
      nextState.sponsorVisa = null;
    }

    setState(nextState);
    const next = getNextScreenFor(currentScreen, nextState);
    navigateTo(next);
  };

  const result = calculateEstimate(state, fees);

  const handleWhatsAppCTA = () => {
    const link = `https://wa.me/773690993?text=${encodeURIComponent(result.whatsappMsg)}`;
    window.open(link, '_blank');
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(result.shareText).then(() => {
        setShareStatus('✓ Copied!');
        setTimeout(() => setShareStatus('Copy Estimate Link'), 2000);
      });
    }
  };

  const progressPercentage = (history.length / 7) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-[500px] sm:rounded-3xl bg-white/90 backdrop-blur-2xl sm:mx-4 shadow-2xl max-h-[92vh] overflow-hidden rounded-t-3xl flex flex-col border border-white/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              {history.length > 0 && currentScreen !== 6 && (
                <button onClick={goBack} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <ChevronLeft size={20} className="text-[#111827]" />
                </button>
              )}
              <span className="text-sm font-semibold text-[#111827]">EmiratesVisa<span className="text-[#EF3340]">.ae</span></span>
            </div>
            <button onClick={handleClose} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X size={20} className="text-[#111827]" />
            </button>
          </div>

          {/* Progress Bar */}
          {currentScreen !== 6 && (
            <div className="px-6 pt-4 shrink-0">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#009B3A] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(12, progressPercentage)}%` }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {/* Screen 1: Category */}
              {currentScreen === 1 && (
                <motion.div
                  key="screen1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["1"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["1"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'family', title: questions["1"].options.family.title, description: questions["1"].options.family.description, icon: 'users' },
                      { id: 'golden', title: questions["1"].options.golden.title, description: questions["1"].options.golden.description, icon: 'star' },
                      { id: 'property', title: questions["1"].options.property.title, description: questions["1"].options.property.description, icon: 'building' },
                      { id: 'newborn', title: questions["1"].options.newborn.title, description: questions["1"].options.newborn.description, icon: 'baby' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelection('look', cat.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                          state.look === cat.id
                            ? 'border-[#009B3A] bg-[#F0FAF4]'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          state.look === cat.id ? 'bg-[#009B3A] text-white' : 'bg-gray-100 text-[#4B5563]'
                        }`}>
                          {categoryIcons[cat.icon]}
                        </div>
                        <div>
                          <p className="font-bold text-[#111827] text-sm">{cat.title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{cat.description}</p>
                        </div>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          state.look === cat.id ? 'border-[#009B3A] bg-[#009B3A]' : 'border-gray-300'
                        }`}>
                          {state.look === cat.id && <Check size={12} className="text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 8: Sponsor Visa Type (Family) */}
              {currentScreen === 8 && (
                <motion.div
                  key="screen8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["8"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["8"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'twoyear', title: questions["8"].options.twoyear.title, description: questions["8"].options.twoyear.description },
                      { id: 'golden', title: questions["8"].options.golden.title, description: questions["8"].options.golden.description },
                      { id: 'retirement', title: questions["8"].options.retirement.title, description: questions["8"].options.retirement.description }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelection('sponsorVisa', s.id)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{s.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{s.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 10: Golden Visa Category Menu */}
              {currentScreen === 10 && (
                <motion.div
                  key="screen10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["10"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["10"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'golden', title: questions["10"].options.golden.title, description: questions["10"].options.golden.description },
                      { id: 'gvcompany', title: questions["10"].options.gvcompany.title, description: questions["10"].options.gvcompany.description },
                      { id: 'gvmanager', title: questions["10"].options.gvmanager.title, description: questions["10"].options.gvmanager.description },
                      { id: 'gvdeposit', title: questions["10"].options.gvdeposit.title, description: questions["10"].options.gvdeposit.description },
                      { id: 'famdep', title: questions["10"].options.famdep.title, description: questions["10"].options.famdep.description }
                    ].map((gv) => (
                      <button
                        key={gv.id}
                        onClick={() => handleSelection('visa', gv.id)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{gv.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{gv.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 12: Property Visa Categories */}
              {currentScreen === 12 && (
                <motion.div
                  key="screen12"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["12"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["12"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'golden', title: questions["12"].options.golden.title, description: questions["12"].options.golden.description },
                      { id: 'retirement', title: questions["12"].options.retirement.title, description: questions["12"].options.retirement.description },
                      { id: 'investor', title: questions["12"].options.investor.title, description: questions["12"].options.investor.description },
                      { id: 'propdep', title: questions["12"].options.propdep.title, description: questions["12"].options.propdep.description }
                    ].map((pv) => (
                      <button
                        key={pv.id}
                        onClick={() => handleSelection('visa', pv.id)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{pv.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{pv.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 17: Which dependent? (Property branch) */}
              {currentScreen === 17 && (
                <motion.div
                  key="screen17"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["17"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["17"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'golden', title: questions["17"].options.golden.title, description: questions["17"].options.golden.description },
                      { id: 'retirement', title: questions["17"].options.retirement.title, description: questions["17"].options.retirement.description },
                      { id: 'investor', title: questions["17"].options.investor.title, description: questions["17"].options.investor.description }
                    ].map((dp) => (
                      <button
                        key={dp.id}
                        onClick={() => handleSelection('sponsorVisa', dp.id as SponsorVisaType)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{dp.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{dp.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 14: New or Renewal */}
              {currentScreen === 14 && (
                <motion.div
                  key="screen14"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["14"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["14"].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'new', title: questions["14"].options.new.title, description: questions["14"].options.new.description },
                      { id: 'renew', title: questions["14"].options.renew.title, description: questions["14"].options.renew.description }
                    ].map((app) => (
                      <button
                        key={app.id}
                        onClick={() => handleSelection('appType', app.id as ApplicationType)}
                        className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-center transition-all flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#009B3A] flex items-center justify-center mb-3">
                          <FileText size={22} />
                        </div>
                        <p className="font-bold text-sm text-[#111827]">{app.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">{app.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 11: 2-Year Sub-type */}
              {currentScreen === 11 && (
                <motion.div
                  key="screen11"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["11"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["11"].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'employee', title: questions["11"].options.employee.title, description: questions["11"].options.employee.description },
                      { id: 'investor', title: questions["11"].options.investor.title, description: questions["11"].options.investor.description }
                    ].map((ty) => (
                      <button
                        key={ty.id}
                        onClick={() => handleSelection('twoYearType', ty.id as TwoYearType)}
                        className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-center transition-all flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#009B3A] flex items-center justify-center mb-3">
                          <Building size={22} />
                        </div>
                        <p className="font-bold text-sm text-[#111827]">{ty.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">{ty.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 5: Inside or Outside UAE */}
              {currentScreen === 5 && (
                <motion.div
                  key="screen5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["5"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["5"].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'inside', title: questions["5"].options.inside.title, description: questions["5"].options.inside.description },
                      { id: 'outside', title: questions["5"].options.outside.title, description: questions["5"].options.outside.description }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => handleSelection('loc', l.id as LocationType)}
                        className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-center transition-all flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#009B3A] flex items-center justify-center mb-3">
                          <Building size={22} />
                        </div>
                        <p className="font-bold text-sm text-[#111827]">{l.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">{l.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 7: Family File Opening */}
              {currentScreen === 7 && (
                <motion.div
                  key="screen7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["7"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["7"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'no', title: questions["7"].options.no.title, description: questions["7"].options.no.description },
                      { id: 'yes', title: questions["7"].options.yes.title, description: questions["7"].options.yes.description }
                    ].map((ff) => (
                      <button
                        key={ff.id}
                        onClick={() => handleSelection('hasFile', ff.id as HasFamilyFile)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{ff.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{ff.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 3: Add Family (Sponsor path) */}
              {currentScreen === 3 && (
                <motion.div
                  key="screen3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["3"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["3"].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'no', title: questions["3"].options.no.title, description: questions["3"].options.no.description },
                      { id: 'yes', title: questions["3"].options.yes.title, description: questions["3"].options.yes.description }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelection('family', opt.id as 'yes' | 'no')}
                        className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-center transition-all flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#009B3A] flex items-center justify-center mb-3">
                          <Users size={22} />
                        </div>
                        <p className="font-bold text-sm text-[#111827]">{opt.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 4: Counters (Adults and Children) */}
              {currentScreen === 4 && (
                <motion.div
                  key="screen4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">How many family members?</h2>
                  <p className="text-sm text-[#6B7280] mb-6">Capped at a total of 9 family members in any combination.</p>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                      <div>
                        <p className="font-bold text-[#111827] text-base">Adults</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Aged 18 and above (medical needed)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={state.adults <= 0}
                          onClick={() => setState(prev => ({ ...prev, adults: Math.max(0, prev.adults - 1) }))}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-lg text-[#111827] w-5 text-center">{state.adults}</span>
                        <button
                          disabled={state.adults + state.children >= 9}
                          onClick={() => setState(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                      <div>
                        <p className="font-bold text-[#111827] text-base">Children</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">Under 18 (exempt from medical)</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          disabled={state.children <= 0}
                          onClick={() => setState(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-lg text-[#111827] w-5 text-center">{state.children}</span>
                        <button
                          disabled={state.adults + state.children >= 9}
                          onClick={() => setState(prev => ({ ...prev, children: prev.children + 1 }))}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      disabled={state.adults + state.children === 0}
                      onClick={() => {
                        const next = getNextScreenFor(4, state);
                        navigateTo(next);
                      }}
                      className="w-full py-4 mt-4 bg-[#009B3A] hover:bg-[#007A2F] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Screen 2: Medical Type */}
              {currentScreen === 2 && (
                <motion.div
                  key="screen2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["2"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["2"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'normal', title: questions["2"].options.normal.title, description: questions["2"].options.normal.description, price: fees.medical.normal },
                      { id: 'vip', title: questions["2"].options.vip.title, description: questions["2"].options.vip.description, price: fees.medical.vip }
                    ].map((med) => (
                      <button
                        key={med.id}
                        onClick={() => handleSelection('medical', med.id as MedicalType)}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 flex items-center justify-between text-left transition-all"
                      >
                        <div>
                          <p className="font-bold text-sm text-[#111827]">{med.title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{med.description}</p>
                        </div>
                        <span className="font-extrabold text-sm text-[#009B3A]">AED {med.price}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 15: Newborn Sponsor Parent */}
              {currentScreen === 15 && (
                <motion.div
                  key="screen15"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["15"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["15"].description}</p>
                  <div className="space-y-3">
                    {[
                      { id: 'employee', title: questions["15"].options.employee.title, description: questions["15"].options.employee.description },
                      { id: 'investor', title: questions["15"].options.investor.title, description: questions["15"].options.investor.description },
                      { id: 'golden', title: questions["15"].options.golden.title, description: questions["15"].options.golden.description }
                    ].map((ns) => (
                      <button
                        key={ns.id}
                        onClick={() => handleSelection('nbSponsor', ns.id as CalculatorState['nbSponsor'])}
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-[#111827]">{ns.title}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{ns.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 16: Newborn Birth Certificate Language */}
              {currentScreen === 16 && (
                <motion.div
                  key="screen16"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-1">{questions["16"].title}</h2>
                  <p className="text-sm text-[#6B7280] mb-6">{questions["16"].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'no', title: questions["16"].options.no.title, description: questions["16"].options.no.description },
                      { id: 'yes', title: questions["16"].options.yes.title, description: questions["16"].options.yes.description }
                    ].map((bc) => (
                      <button
                        key={bc.id}
                        onClick={() => handleSelection('nbEnglish', bc.id as BirthCertLanguage)}
                        className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-center transition-all flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#009B3A] flex items-center justify-center mb-3">
                          <FileText size={22} />
                        </div>
                        <p className="font-bold text-sm text-[#111827]">{bc.title}</p>
                        <p className="text-[11px] text-[#6B7280] mt-1">{bc.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Screen 6: Results Breakdown */}
              {currentScreen === 6 && (
                <motion.div
                  key="screen6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3 text-[#009B3A]">
                      <Check size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827]">{result.title}</h2>
                    <p className="text-sm text-[#6B7280] mt-0.5">{result.subtitle}</p>
                  </div>

                  {/* Pricing panels */}
                  <div className="space-y-4">
                    {!showCompare ? (
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200/60">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#EF3340]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white border border-gray-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#009B3A]" />
                          <span className="ml-auto text-xs text-[#6B7280] font-bold uppercase tracking-wider">
                            Government Fees
                          </span>
                        </div>

                        <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                          {result.fees.map((fItem, i) => (
                            <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                              <span className="text-[#4B5563]">{fItem.name}</span>
                              <span className="font-bold text-[#111827] tabular-nums">AED {fItem.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between pt-4 mt-4 border-t-2 border-[#111827]">
                          <span className="text-sm font-bold text-[#111827]">Grand Total</span>
                          <span className="text-xl font-extrabold text-[#EF3340] tabular-nums">AED {result.grandTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200/60">
                          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                            AMER Center vs DIY
                          </span>
                          <span className="text-xs text-[#009B3A] font-bold">AED Comparison</span>
                        </div>

                        <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="border-b border-gray-200 text-[#6B7280]">
                                <th className="pb-2 font-semibold">Service Item</th>
                                <th className="pb-2 font-semibold text-right">DIY (Govt)</th>
                                <th className="pb-2 font-semibold text-right">AMER Center</th>
                              </tr>
                            </thead>
                            <tbody>
                              {result.compareItems?.map((cItem, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0 text-[#111827]">
                                  <td className="py-2.5 text-[#4B5563]">
                                    {cItem.name} {cItem.qty > 1 && <span className="text-gray-400 font-normal">x{cItem.qty}</span>}
                                  </td>
                                  <td className="py-2.5 text-right font-semibold tabular-nums">AED {cItem.diy.toLocaleString()}</td>
                                  <td className="py-2.5 text-right font-semibold tabular-nums">AED {cItem.amer.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="pt-4 mt-4 border-t-2 border-[#111827] space-y-2">
                          <div className="flex justify-between text-xs text-[#4B5563]">
                            <span>DIY Total:</span>
                            <span className="font-bold text-[#111827]">AED {result.compareDiyTotal?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs text-[#4B5563]">
                            <span>AMER Total:</span>
                            <span className="font-bold text-[#111827]">AED {result.compareAmerTotal?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-dashed border-gray-300 text-sm font-bold">
                            <span className="text-[#009B3A]">DIY Savings</span>
                            <span className="text-[#009B3A]">AED {((result.compareAmerTotal || 0) - (result.compareDiyTotal || 0)).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {result.refundableDeposit && result.refundableDeposit > 0 ? (
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                        <strong>Refundable Deposit:</strong> An additional immigration deposit of <strong>AED 3,000 per dependent</strong> (totaling <strong>AED {result.refundableDeposit.toLocaleString()}</strong>) will be required. This deposit is fully refundable upon visa cancellation.
                      </div>
                    ) : null}

                    {result.compareItems && result.compareItems.length > 0 && (
                      <button
                        onClick={() => setShowCompare(!showCompare)}
                        className="w-full py-3 border border-gray-200 hover:border-gray-300 text-[#111827] rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        {showCompare ? "↩ Back to Government Fees" : "⇄ Compare with AMER Center"}
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={handleWhatsAppCTA}
                        className="py-4 bg-[#009B3A] hover:bg-[#007A2F] text-white rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Share2 size={18} /> Apply on WhatsApp
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="py-4 bg-gray-100 hover:bg-gray-200 text-[#111827] rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {shareStatus}
                      </button>
                    </div>

                    <button
                      onClick={reset}
                      className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-[#4B5563] rounded-full text-xs font-semibold transition-colors mt-2"
                    >
                      Calculate Again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
