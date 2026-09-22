import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Scale,
  ShieldAlert,
  Building2,
  Calendar,
  Layers,
  FileCheck,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LegalMotionDocument, MotionCategory, Language } from '../types';
import { INITIAL_PRESETS } from '../data/legalPresets';

interface MotionStudioProps {
  lang: Language;
}

export const MotionStudio: React.FC<MotionStudioProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [selectedCategory, setSelectedCategory] = useState<MotionCategory>('tamin_khaste');
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);

  // Initialize document with default preset
  const [doc, setDoc] = useState<LegalMotionDocument>({
    id: 'doc-001',
    title: INITIAL_PRESETS.tamin_khaste.title || '',
    category: 'tamin_khaste',
    courtBranch: INITIAL_PRESETS.tamin_khaste.courtBranch || '',
    caseNumber: INITIAL_PRESETS.tamin_khaste.caseNumber || '',
    filingDate: INITIAL_PRESETS.tamin_khaste.filingDate || '',
    applicant: INITIAL_PRESETS.tamin_khaste.applicant || {
      name: '',
      nationalId: '',
      fatherName: '',
      address: '',
      role: 'applicant'
    },
    respondent: INITIAL_PRESETS.tamin_khaste.respondent || {
      name: '',
      nationalId: '',
      fatherName: '',
      address: '',
      role: 'respondent'
    },
    subject: INITIAL_PRESETS.tamin_khaste.subject || '',
    legalArticles: INITIAL_PRESETS.tamin_khaste.legalArticles || [],
    argumentsText: INITIAL_PRESETS.tamin_khaste.argumentsText || '',
    reliefSought: INITIAL_PRESETS.tamin_khaste.reliefSought || '',
    securityDeposit: INITIAL_PRESETS.tamin_khaste.securityDeposit || '',
    status: 'draft'
  });

  const handleCategoryChange = (cat: MotionCategory) => {
    setSelectedCategory(cat);
    const preset = INITIAL_PRESETS[cat];
    if (preset) {
      setDoc((prev) => ({
        ...prev,
        category: cat,
        title: preset.title || prev.title,
        courtBranch: preset.courtBranch || prev.courtBranch,
        caseNumber: preset.caseNumber || prev.caseNumber,
        filingDate: preset.filingDate || prev.filingDate,
        applicant: preset.applicant || prev.applicant,
        respondent: preset.respondent || prev.respondent,
        subject: preset.subject || prev.subject,
        legalArticles: preset.legalArticles || prev.legalArticles,
        argumentsText: preset.argumentsText || prev.argumentsText,
        reliefSought: preset.reliefSought || prev.reliefSought,
        securityDeposit: preset.securityDeposit || prev.securityDeposit
      }));
    }
  };

  const handleCopyText = () => {
    const fullText = `
${doc.courtBranch}
کلاسه پرونده: ${doc.caseNumber}
تاریخ تنظیم: ${doc.filingDate}

خواهان / متقاضی: ${doc.applicant.name} (کد ملی: ${doc.applicant.nationalId || '-'})
خوانده / طرف مقابل: ${doc.respondent.name} (شناسه / کد ملی: ${doc.respondent.nationalId || '-'})

موضوع: ${doc.subject}

مستندات قانونی:
${doc.legalArticles.map((art, idx) => `${idx + 1}. ${art}`).join('\n')}

شرح لایحه و درخواست:
${doc.argumentsText}

خواسته نهایی:
${doc.reliefSought}

تأمین / خسارت احتمالی:
${doc.securityDeposit || 'طبق نظر دادگاه'}
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gharar-motion-${doc.category}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categoriesList: { id: MotionCategory; labelFa: string; labelEn: string; icon: string }[] = [
    { id: 'tamin_khaste', labelFa: 'قرار تأمین خواسته', labelEn: 'Attachment of Assets', icon: '⚖️' },
    { id: 'dastoor_movaghat', labelFa: 'قرار دستور موقت', labelEn: 'Preliminary Injunction', icon: '🛑' },
    { id: 'karshenasi', labelFa: 'قرار ارجاع به کارشناس', labelEn: 'Expert Witness Order', icon: '🔍' },
    { id: 'mane_taghib', labelFa: 'لایحه قرار منع تعقیب', labelEn: 'Motion to Dismiss', icon: '🛡️' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Preset Selection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              <span>{isFa ? 'استودیوی تنظیم قرارها و لوایح حقوقی' : 'Judicial Motion & Court Order Studio'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isFa
                ? 'تنظیم، ویرایش و صدور پیش‌نویس لوایح و تقاضای قرارهای قضایی طبق استانداردهای قوه قضائیه'
                : 'Draft, customize and export interlocutory court orders and legal defense motions'}
            </p>
          </div>

          {/* View Mode Toggle & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                id="btn-view-preview"
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isFa ? '📄 پیش‌نمایش رسمی' : '📄 Official Document'}
              </button>
              <button
                id="btn-view-editor"
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  viewMode === 'editor' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isFa ? '✏️ فرم ویرایش' : '✏️ Edit Fields'}
              </button>
            </div>

            <button
              id="btn-copy-motion"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? (isFa ? 'کپی شد' : 'Copied!') : (isFa ? 'کپی متن' : 'Copy')}</span>
            </button>

            <button
              id="btn-print-motion"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>{isFa ? 'چاپ دادنامه' : 'Print / PDF'}</span>
            </button>

            <button
              id="btn-export-json"
              onClick={handleDownloadJSON}
              title={isFa ? 'خروجی داده JSON' : 'Export JSON'}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="pt-4">
          <label className="block text-xs font-medium text-slate-500 mb-2">
            {isFa ? 'انتخاب نمونه قرار یا لایحه قضایی:' : 'Select Court Order or Motion Preset:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categoriesList.map((item) => {
              const isSelected = selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  id={`cat-btn-${item.id}`}
                  onClick={() => handleCategoryChange(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs text-start transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold ring-1 ring-amber-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <div className="leading-tight">{isFa ? item.labelFa : item.labelEn}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area: Editor vs Official Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Editor Column */}
        <div className={`lg:col-span-5 space-y-4 ${viewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span>{isFa ? 'مشخصات مرجع قضایی و اصحاب دعوا' : 'Court & Parties Information'}</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                {doc.caseNumber || 'کلاسه پرونده'}
              </span>
            </div>

            {/* Court Branch */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'مرجع قضایی رسیدگی‌کننده' : 'Court Branch / Jurisdiction'}
              </label>
              <input
                type="text"
                value={doc.courtBranch}
                onChange={(e) => setDoc({ ...doc, courtBranch: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isFa ? 'شماره پرونده / کلاسه' : 'Case Docket Number'}
                </label>
                <input
                  type="text"
                  value={doc.caseNumber}
                  onChange={(e) => setDoc({ ...doc, caseNumber: e.target.value })}
                  className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isFa ? 'تاریخ ثبت' : 'Filing Date'}
                </label>
                <input
                  type="text"
                  value={doc.filingDate}
                  onChange={(e) => setDoc({ ...doc, filingDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Applicant (Plaintiff) */}
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-2">
              <span className="text-xs font-bold text-amber-900 block">
                {isFa ? 'مشخصات متقاضی / خواهان / شاکی' : 'Applicant / Plaintiff / Complainant'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                  value={doc.applicant.name}
                  onChange={(e) =>
                    setDoc({ ...doc, applicant: { ...doc.applicant, name: e.target.value } })
                  }
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  placeholder={isFa ? 'کد ملی / شناسه' : 'National ID'}
                  value={doc.applicant.nationalId || ''}
                  onChange={(e) =>
                    setDoc({ ...doc, applicant: { ...doc.applicant, nationalId: e.target.value } })
                  }
                  className="text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Respondent (Defendant) */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                {isFa ? 'مشخصات طرف مقابل / خوانده / متهم' : 'Respondent / Defendant'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={isFa ? 'نام خوانده / شخص حقوقی' : 'Respondent Name'}
                  value={doc.respondent.name}
                  onChange={(e) =>
                    setDoc({ ...doc, respondent: { ...doc.respondent, name: e.target.value } })
                  }
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  placeholder={isFa ? 'کد ملی / شناسه ملی' : 'ID Number'}
                  value={doc.respondent.nationalId || ''}
                  onChange={(e) =>
                    setDoc({ ...doc, respondent: { ...doc.respondent, nationalId: e.target.value } })
                  }
                  className="text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'موضوع درخواست / لایحه' : 'Subject of Petition'}
              </label>
              <input
                type="text"
                value={doc.subject}
                onChange={(e) => setDoc({ ...doc, subject: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Arguments text */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'شرح استدلال حقوقی و جهات دادخواست' : 'Legal Arguments & Factual Basis'}
              </label>
              <textarea
                rows={6}
                value={doc.argumentsText}
                onChange={(e) => setDoc({ ...doc, argumentsText: e.target.value })}
                className="w-full text-xs leading-relaxed px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white resize-y"
              />
            </div>

            {/* Relief Sought */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'خواسته یا دستور قضایی مورد تقاضا' : 'Relief Sought / Specific Court Order'}
              </label>
              <input
                type="text"
                value={doc.reliefSought}
                onChange={(e) => setDoc({ ...doc, reliefSought: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white"
              />
            </div>

            {/* Security Deposit (for Tamin/Injunction) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'تأمین خسارت احتمالی' : 'Collateral / Security Deposit'}
              </label>
              <input
                type="text"
                value={doc.securityDeposit || ''}
                onChange={(e) => setDoc({ ...doc, securityDeposit: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right/Official Document Layout */}
        <div className={`lg:col-span-7 ${viewMode === 'editor' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-8 relative print:border-none print:shadow-none print:p-0">
            {/* Authentic Iranian Judiciary Watermark / Header Pattern */}
            <div className="border-b-2 border-slate-800 pb-5 mb-6 text-center space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono pb-2 border-b border-slate-200">
                <div className="text-start">
                  <div>کلاسه پرونده: {doc.caseNumber}</div>
                  <div>شماره بایگانی شعبه: ۹۸۰۲۱۴</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">جمهوری اسلامی ایران</div>
                  <div className="text-xs font-extrabold text-slate-900">قوه قضائیه</div>
                </div>
                <div className="text-end">
                  <div>تاریخ: {doc.filingDate}</div>
                  <div>پیوست: دارد</div>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="flex justify-center pt-2">
                <div className="bg-slate-100 px-4 py-1 rounded-sm border border-slate-300 inline-flex flex-col items-center">
                  <div className="flex gap-[2px] h-6 items-end">
                    {[12, 18, 8, 24, 14, 20, 10, 22, 16, 24, 8, 14, 20, 12, 24, 10, 16, 22, 14, 8, 20, 12, 18].map(
                      (h, i) => (
                        <div key={i} className="w-[2px] bg-slate-900" style={{ height: `${h}px` }} />
                      )
                    )}
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-slate-600">
                    SANA-ORD-{doc.caseNumber.replace(/\D/g, '').slice(-8) || '84920194'}
                  </span>
                </div>
              </div>

              <h1 className="text-base sm:text-lg font-black text-slate-900 pt-2 tracking-tight">
                {doc.title}
              </h1>
              <div className="text-xs font-semibold text-slate-700">{doc.courtBranch}</div>
            </div>

            {/* Document Content */}
            <div className="space-y-5 text-xs sm:text-sm text-slate-800 leading-relaxed">
              {/* Parties Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">
                    {isFa ? 'متقاضی / خواهان:' : 'Applicant / Plaintiff:'}
                  </span>
                  <div className="text-slate-700">{doc.applicant.name}</div>
                  {doc.applicant.nationalId && (
                    <div className="text-slate-500 font-mono text-[11px]">
                      کد ملی: {doc.applicant.nationalId}
                    </div>
                  )}
                  {doc.applicant.address && (
                    <div className="text-slate-500 text-[11px] truncate">نشانی: {doc.applicant.address}</div>
                  )}
                </div>

                <div className="border-t sm:border-t-0 sm:border-r border-slate-200 pt-2 sm:pt-0 sm:pr-3">
                  <span className="font-bold text-slate-900 block mb-1">
                    {isFa ? 'طرف مقابل / خوانده:' : 'Respondent / Defendant:'}
                  </span>
                  <div className="text-slate-700">{doc.respondent.name}</div>
                  {doc.respondent.nationalId && (
                    <div className="text-slate-500 font-mono text-[11px]">
                      شناسه/کد ملی: {doc.respondent.nationalId}
                    </div>
                  )}
                  {doc.respondent.address && (
                    <div className="text-slate-500 text-[11px] truncate">نشانی: {doc.respondent.address}</div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/70">
                <span className="font-bold text-slate-900 ml-1">موضوع:</span>
                <span className="font-medium text-slate-800">{doc.subject}</span>
              </div>

              {/* Legal Articles Grounds */}
              {doc.legalArticles.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">
                    مستندات قانونی و مواد استنادی:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                    {doc.legalArticles.map((art, idx) => (
                      <li key={idx} className="font-medium">
                        {art}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Arguments Body */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block text-xs">
                  شرح ماوقع و استدلال حقوقی:
                </span>
                <div className="p-4 bg-white rounded-xl border border-slate-200 whitespace-pre-line text-justify leading-relaxed font-normal text-slate-800">
                  {doc.argumentsText}
                </div>
              </div>

              {/* Relief Sought / Decision */}
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                <span className="font-bold text-amber-400 block text-xs">
                  {isFa ? 'نتیجه و دستور قضایی مورد استدعا:' : 'Final Relied Sought / Court Ruling:'}
                </span>
                <p className="text-xs leading-relaxed text-slate-200">{doc.reliefSought}</p>
                {doc.securityDeposit && (
                  <div className="text-[11px] text-amber-300/90 pt-1 border-t border-slate-800">
                    مبلغ یا شرایط خسارت احتمالی: {doc.securityDeposit}
                  </div>
                )}
              </div>

              {/* Official Signature & Simulated Court Stamp */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-end justify-between">
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>تأییدیه الکترونیک سامانه خودکاربری قوه قضائیه</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">شناسه اعتبارسنجی: IR-JUD-9942048-V1</div>
                </div>

                {/* Simulated Judicial Circular Seal */}
                <div className="relative w-28 h-28 border-2 border-red-800/60 rounded-full flex flex-col items-center justify-center p-2 text-center text-red-900/80 rotate-[-8deg] pointer-events-none select-none">
                  <div className="text-[8px] font-black tracking-tighter">دادگستری جمهوری اسلامی ایران</div>
                  <Scale className="w-5 h-5 my-0.5 text-red-900/70" />
                  <div className="text-[9px] font-extrabold">{doc.courtBranch.slice(0, 18)}</div>
                  <div className="text-[7px] font-mono">ابلاغ و ثبت رسمی</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
