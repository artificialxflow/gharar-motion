import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Sliders,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, AmbiguityItem } from '../types';
import { GHARAR_RISK_CHECKLIST } from '../data/legalPresets';

interface GhararAnalyzerProps {
  lang: Language;
}

export const GhararAnalyzer: React.FC<GhararAnalyzerProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [items, setItems] = useState<AmbiguityItem[]>(GHARAR_RISK_CHECKLIST);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sample contract clauses for quick testing
  const sampleClauses = [
    {
      titleFa: 'پیش‌فروش آپارتمان (دارای ابهام در ثمن و متراژ)',
      titleEn: 'Pre-sale Apartment (Vague Price & Specs)',
      text: `مورد معامله عبارت است از یک واحد آپارتمان در طبقه سوم مجتمع مسکونی واقع در سعادت‌آباد به متراژ تقریبی ۱۲۰ مترمربع. ثمن معامله بر اساس قیمت روز بازار در هنگام صدور سند رسمی تعیین و توافق خواهد شد و تحویل واحد در اولین فرصت پس از اتمام نازک‌کاری صورت می‌پذیرد. در صورت بروز اختلاف، نظر یک فرد معتمد لازم‌الاتباع است.`
    },
    {
      titleFa: 'پیمانکاری طراحی نرم‌افزار (دارای شرط معلق مبهم)',
      titleEn: 'Software Development Agreement (Unclear Condition)',
      text: `موضوع قرارداد عبارت است از توسعه سامانه اختصاصی طبق نیازهای عمومی کارفرما. مبلغ قرارداد پس از حصول رضایت کامل و کسب سود عملیاتی پرداخت می‌گردد. زمان تحویل منوط به صلاحدید مجری پروژه و در اسرع وقت خواهد بود.`
    }
  ];

  const [customText, setCustomText] = useState(sampleClauses[0].text);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAddressed: !item.isAddressed } : item))
    );
  };

  // Calculate Gharar Transparency Score
  const addressedCount = items.filter((i) => i.isAddressed).length;
  const score = Math.round((addressedCount / items.length) * 100);

  const getRiskStatus = () => {
    if (score >= 80) {
      return {
        labelFa: 'قرارداد شفاف و فاقد غرر (معتبر و استوار)',
        labelEn: 'Safe & Clear (Gharar-Free Contract)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        badge: 'ایمن'
      };
    }
    if (score >= 40) {
      return {
        labelFa: 'ریسک متوسط غرر (نیازمند شفاف‌سازی شروط)',
        labelEn: 'Moderate Risk (Requires Clarification)',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        badge: 'احتیاط'
      };
    }
    return {
      labelFa: 'غرر فاحش و خطر بطلان معامله (مجهول بودن ارکان عقد)',
      labelEn: 'Critical Gharar Risk (Contract Potentially Void)',
      color: 'text-rose-800 bg-rose-50 border-rose-300',
      badge: 'پرریسک'
    };
  };

  const status = getRiskStatus();

  const handleCopyRecommendation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {isFa ? 'تحلیلگر هوشمند ریسک غرر و ابهامات قرارداد' : 'Gharar & Contract Ambiguity Risk Analyzer'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
              {isFa
                ? 'طبق قاعده فقهی و حقوقی «نهی النبی عن الغرر» و مواد ۱۹۰ و ۲۱۶ قانون مدنی، هرگونه ابهام مجهول در مبیع، ثمن، زمان تحویل یا شروط معلق می‌تواند معامله را باطل کند. با این ابزار، ارکان عقد را از حیث شفافیت اعتبارسنجی کنید.'
                : 'Under Islamic jurisprudence and Civil Code (Arts 190 & 216), excessive ambiguity (Gharar) in price, subject matter, or deadlines voids the contract. Validate your contractual terms against Gharar vulnerabilities.'}
            </p>
          </div>

          {/* Quick Score Meter */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900">{score}٪</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {isFa ? 'شاخص شفافیت' : 'Clarity Score'}
              </div>
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-lg border font-bold ${status.color}`}>
              {status.badge}
            </div>
          </div>
        </div>

        {/* Preset Clause Selection */}
        <div className="pt-4 space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            {isFa ? 'نمونه بندهای قرارداد جهت تحلیل و بررسی:' : 'Select Sample Clause to Analyze:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleClauses.map((sc, i) => (
              <button
                key={i}
                onClick={() => setCustomText(sc.text)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-700 font-medium transition-colors"
              >
                📋 {isFa ? sc.titleFa : sc.titleEn}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={isFa ? 'متن بند قرارداد مورد نظر را وارد نمایید...' : 'Paste your contractual clause here...'}
              className="w-full text-xs leading-relaxed p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Checklist & Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive 5 Pillars Checklist */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-600" />
                <span>{isFa ? 'چک‌لیست پنج‌گانه ارکان نفی غرر' : '5 Pillars of Gharar Elimination'}</span>
              </span>
              <span className="text-[11px] text-slate-500">
                {addressedCount} از {items.length} {isFa ? 'مورد رعایت شده' : 'safeguarded'}
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    item.isAddressed
                      ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      {item.isAddressed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">
                          {isFa ? item.titleFa : item.titleEn}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.riskLevel === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : item.riskLevel === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.riskLevel === 'high' ? 'غرر اساسی' : item.riskLevel === 'medium' ? 'ابهام نسبی' : 'توصیه تکمیلی'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {isFa ? item.descriptionFa : item.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Concrete Rewrite Solutions & Legal Clauses */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isFa ? 'پیشنهادات اصلاحی و نگارش بدون غرر' : 'Standard Gharar-Free Clauses'}</span>
              </span>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium border border-amber-200">
                قانون مدنی مواد ۱۹۰ تا ۲۳۳
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {isFa ? item.titleFa : item.titleEn}
                    </span>
                    <button
                      onClick={() =>
                        handleCopyRecommendation(item.id, isFa ? item.recommendationFa : item.recommendationEn)
                      }
                      className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md border border-slate-200 bg-white"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">{isFa ? 'کپی شد' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{isFa ? 'کپی متن بند' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Standard Suggested Clause */}
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal">
                    <span className="text-emerald-700 font-bold ml-1">بند اصلاحی پیشنهادی:</span>
                    {isFa ? item.recommendationFa : item.recommendationEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
