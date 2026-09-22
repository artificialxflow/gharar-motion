import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Scale,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { WORKFLOW_STAGES } from '../data/legalPresets';

interface WorkflowTimelineProps {
  lang: Language;
}

export const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const [activeStep, setActiveStep] = useState<number>(1);

  // Deadlines calculator state
  const [motionType, setMotionType] = useState<'tamin_objection' | 'tamin_main_lawsuit' | 'tajdid_nazar' | 'vakhahi'>('tamin_objection');
  const [noticeDate, setNoticeDate] = useState<string>('1403/07/15');
  const [daysWindow, setDaysWindow] = useState<number>(10);

  const handleMotionTypeChange = (type: typeof motionType) => {
    setMotionType(type);
    if (type === 'tamin_objection') {
      setDaysWindow(10);
    } else if (type === 'tamin_main_lawsuit') {
      setDaysWindow(20);
    } else if (type === 'tajdid_nazar') {
      setDaysWindow(20);
    } else if (type === 'vakhahi') {
      setDaysWindow(20);
    }
  };

  const currentStage = WORKFLOW_STAGES.find((s) => s.id === activeStep) || WORKFLOW_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Activity className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {isFa ? 'رهگیری گردش‌کار قرارها و مواعد قانونی دادرسی' : 'Judicial Motion Lifecycle & Statutory Deadlines'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
              {isFa
                ? 'مراحل رسیدگی، صدور و اجرای انواع قرارهای قضایی (تأمین خواسته، دستور موقت، کارشناسی) همراه با محاسبه‌گر دقیق مواعد دادرسی (مواد ۴۴۲ تا ۴۵۰ قانون آیین دادرسی مدنی)'
                : 'Interactive step-by-step judicial lifecycle and statutory appeal deadline calculator according to procedural law.'}
            </p>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {WORKFLOW_STAGES.map((stage) => {
              const isCurrent = activeStep === stage.id;
              const isPast = activeStep > stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStep(stage.id)}
                  className={`p-3 rounded-xl border text-xs text-start transition-all relative overflow-hidden ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-xs ring-1 ring-amber-400'
                      : isPast
                      ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 font-medium'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/80 border border-slate-200">
                      گام {stage.id}
                    </span>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {isCurrent && <Clock className="w-4 h-4 text-amber-600 animate-pulse" />}
                  </div>
                  <div className="leading-tight truncate">{isFa ? stage.titleFa : stage.titleEn}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Stage Details & Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Stage Focus */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-lg">
                مرحله شماره {currentStage.id}: {isFa ? currentStage.titleFa : currentStage.titleEn}
              </span>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{isFa ? currentStage.timeframeFa : currentStage.timeframeEn}</span>
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {isFa ? currentStage.descFa : currentStage.descEn}
              </p>

              {currentStage.statuteReference && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900 ml-1">مستند قانونی:</span>
                    <span>{currentStage.statuteReference}</span>
                  </div>
                </div>
              )}

              {/* Action buttons to navigate steps */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  {isFa ? '← گام قبلی' : '← Previous Step'}
                </button>
                <button
                  disabled={activeStep === WORKFLOW_STAGES.length}
                  onClick={() => setActiveStep((prev) => Math.min(WORKFLOW_STAGES.length, prev + 1))}
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  {isFa ? 'گام بعدی →' : 'Next Step →'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statutory Deadlines Calculator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>{isFa ? 'محاسبه‌گر مواعد قانونی دادرسی' : 'Statutory Deadline Calculator'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">ق.آ.د.م ماده ۴۴۳</span>
            </div>

            {/* Select Motion Type */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                {isFa ? 'نوع قرار یا اقدام حقوقی:' : 'Type of Order / Procedural Step:'}
              </label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => handleMotionTypeChange('tamin_objection')}
                  className={`p-2.5 rounded-xl border text-start transition-colors ${
                    motionType === 'tamin_objection'
                      ? 'border-amber-500 bg-amber-50/70 font-bold text-amber-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  اعتراض به قرار تأمین خواسته (۱۰ روز از ابلاغ - ماده ۱۱۶)
                </button>
                <button
                  onClick={() => handleMotionTypeChange('tamin_main_lawsuit')}
                  className={`p-2.5 rounded-xl border text-start transition-colors ${
                    motionType === 'tamin_main_lawsuit'
                      ? 'border-amber-500 bg-amber-50/70 font-bold text-amber-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  مهلت اقامه دعوای اصلی پس از تأمین (۲۰ روز - ماده ۱۱۲)
                </button>
                <button
                  onClick={() => handleMotionTypeChange('tajdid_nazar')}
                  className={`p-2.5 rounded-xl border text-start transition-colors ${
                    motionType === 'tajdid_nazar'
                      ? 'border-amber-500 bg-amber-50/70 font-bold text-amber-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  تجدیدنظرخواهی از قرارهای قاطع (۲۰ روز - ماده ۳۳۶)
                </button>
              </div>
            </div>

            {/* Input Notification Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isFa ? 'تاریخ ابلاغ واقعی در سامانه ثنا:' : 'E-Notice Delivery Date (Sana):'}
              </label>
              <input
                type="text"
                value={noticeDate}
                onChange={(e) => setNoticeDate(e.target.value)}
                placeholder="۱۴۰۳/۰۷/۱۵"
                className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white"
              />
            </div>

            {/* Computed Deadline Card */}
            <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>{isFa ? 'مهلت قانونی مقرر:' : 'Statutory Window:'}</span>
                <span className="font-mono">{daysWindow} روز کاری</span>
              </div>
              <div className="text-xs text-slate-200 leading-relaxed">
                طبق ماده ۴۴۵ قانون آیین دادرسی مدنی: «روز ابلاغ و روز اقدام جزء مدت محسوب نمی‌شود.»
              </div>
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">آخرین روز مهلت قانونی:</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {noticeDate ? `${noticeDate} + ${daysWindow} روز` : 'تعیین نشده'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
