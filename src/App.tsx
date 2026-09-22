import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MotionStudio } from './components/MotionStudio';
import { GhararAnalyzer } from './components/GhararAnalyzer';
import { WorkflowTimeline } from './components/WorkflowTimeline';
import { LegalKnowledgeBase } from './components/LegalKnowledgeBase';
import { Language } from './types';
import { Scale, ShieldCheck, Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'analyzer' | 'workflow' | 'statutes'>('studio');
  const [lang, setLang] = useState<Language>('fa');

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const isFa = lang === 'fa';

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col text-slate-900 font-sans">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'studio' && <MotionStudio lang={lang} />}
        {activeTab === 'analyzer' && <GhararAnalyzer lang={lang} />}
        {activeTab === 'workflow' && <WorkflowTimeline lang={lang} />}
        {activeTab === 'statutes' && <LegalKnowledgeBase lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-slate-700">
              {isFa ? 'سامانه هوشمند قرار موشن (Gharar Motion)' : 'Gharar Motion Legal Suite'}
            </span>
            <span>•</span>
            <span>{isFa ? 'مطابق با قوانین دادرسی مدنی و اصول نفی غرر' : 'Civil Procedure & Anti-Gharar Standards'}</span>
          </div>

          <div className="text-center sm:text-end text-[11px] text-slate-400">
            {isFa
              ? 'تذکر: این سامانه جهت پیش‌نویس لوایح و سنجش ابهامات بوده و جایگزین مشاوره وکیل رسمی دادگستری نمی‌باشد.'
              : 'Notice: This platform is for drafting and ambiguity screening; consult a licensed attorney.'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
