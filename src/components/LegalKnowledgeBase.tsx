import React, { useState } from 'react';
import { BookOpen, Search, Scale, FileText, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { Language } from '../types';
import { STATUTE_ARTICLES_CATALOG } from '../data/legalPresets';

interface LegalKnowledgeBaseProps {
  lang: Language;
}

export const LegalKnowledgeBase: React.FC<LegalKnowledgeBaseProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');

  const classifications = [
    {
      id: 'all',
      titleFa: 'همه مباحث و مواد قانونی',
      titleEn: 'All Statutes & Articles'
    },
    {
      id: 'edadi',
      titleFa: 'قرارهای اعدادی (مقدماتی)',
      titleEn: 'Interlocutory Evidentiary Orders'
    },
    {
      id: 'ghate',
      titleFa: 'قرارهای قاطع دعوا',
      titleEn: 'Dispositive Court Rulings'
    },
    {
      id: 'tamini',
      titleFa: 'قرارهای تأمینی و احتیاطی',
      titleEn: 'Attachment & Injunction Orders'
    },
    {
      id: 'gharar_sharia',
      titleFa: 'قاعده نفی غرر در قانون مدنی',
      titleEn: 'Gharar & Ambiguity in Contracts'
    }
  ];

  const courtOrdersOverview = [
    {
      category: 'قرارهای اعدادی (مقدماتی)',
      desc: 'قرارهایی که پرونده را برای صدور رأی قاطع آماده می‌کنند و به تنهایی دعوا را خاتمه نمی‌دهند.',
      examples: ['قرار ارجاع به کارشناس (ماده ۲۵۷)', 'قرار معاینه محل (ماده ۲۴۸)', 'قرار تحقیق محلی (ماده ۲۴۹)', 'قرار اتیان سوگند']
    },
    {
      category: 'قرارهای قاطع دعوا',
      desc: 'قرارهایی که با صدور آنها پرونده از شعبه دادگاه خارج شده و دعوا در آن مرحله پایان می‌پذیرد.',
      examples: ['قرار رد دعوا (به دلیل فقدان سمت یا اعتبار امر مختومه)', 'قرار عدم استماع دعوا', 'قرار سقوط دعوا', 'قرار ابطال دادخواست']
    },
    {
      category: 'قرارهای تأمینی و موقتی',
      desc: 'قرارهایی که جهت حفظ حقوق خواهان، جلوگیری از اتلاف مال یا پیشگیری از ورود خسارت غیرقابل جبران صادر می‌شوند.',
      examples: ['قرار تأمین خواسته (ماده ۱۰۸)', 'دستور موقت (ماده ۳۱۰)', 'قرار تأمین دلیل (ماده ۱۴۹)']
    }
  ];

  const filteredArticles = STATUTE_ARTICLES_CATALOG.filter((item) => {
    const matchQuery =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Search & Intro */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {isFa ? 'پایگاه قوانین، مقررات و طبقه‌بندی قرارها' : 'Legal Statutes & Judicial Orders Knowledge Base'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
              {isFa
                ? 'مرجع تخصصی دسته‌بندی انواع قرارها در دادرسی مدنی و کیفری، همراه با مفاد دقیق مواد قانونی مرتبط با نفی غرر و جهالت در قراردادها.'
                : 'Statutory references, categorization of interlocutory vs dispositive orders, and civil code doctrines.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
            <input
              type="text"
              placeholder={isFa ? 'جستجو در مواد و قوانین...' : 'Search articles and terms...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs ps-9 pe-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Classification Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
          {courtOrdersOverview.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-amber-600" />
                <span>{item.category}</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
              <div className="pt-2 flex flex-wrap gap-1">
                {item.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtered Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((art, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono">
                {art.code}
              </span>
              <Scale className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">{art.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">{art.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
