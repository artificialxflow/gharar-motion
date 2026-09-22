import React from 'react';
import { Scale, FileSignature, ShieldCheck, Activity, BookOpen, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  activeTab: 'studio' | 'analyzer' | 'workflow' | 'statutes';
  setActiveTab: (tab: 'studio' | 'analyzer' | 'workflow' | 'statutes') => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang
}) => {
  const isFa = lang === 'fa';

  const navItems = [
    {
      id: 'studio' as const,
      labelFa: 'استودیو قرار و لوایح',
      labelEn: 'Motion Studio',
      icon: FileSignature,
      badge: 'کارگاه تدوین'
    },
    {
      id: 'analyzer' as const,
      labelFa: 'تحلیلگر ریسک غرر',
      labelEn: 'Gharar Risk Analyzer',
      icon: ShieldCheck,
      badge: 'ابهام‌زدایی'
    },
    {
      id: 'workflow' as const,
      labelFa: 'گردش‌کار و مواعد',
      labelEn: 'Motion Workflow',
      icon: Activity,
      badge: 'رهگیری'
    },
    {
      id: 'statutes' as const,
      labelFa: 'پایگاه قوانین و قرارها',
      labelEn: 'Legal Statutes',
      icon: BookOpen,
      badge: 'مستندات'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-amber-600/20 ring-2 ring-amber-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  {isFa ? 'قرار موشن' : 'Gharar Motion'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {isFa ? 'سامانه دادرسی و قرارداد' : 'Legal Motion Suite'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isFa
                  ? 'تدوین هوشمند قرارها و لوایح قضایی • سنجش ریسک غرر در قراردادها'
                  : 'Smart Judicial Motions, Court Orders & Contract Gharar Analysis'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm shadow-slate-200 ring-1 ring-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{isFa ? item.labelFa : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLang(isFa ? 'en' : 'fa')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-2xs transition-colors"
              title={isFa ? 'تغییر به انگلیسی' : 'Switch to Persian'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{isFa ? 'English' : 'فارسی'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isFa ? item.labelFa : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
