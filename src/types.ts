export type Language = 'fa' | 'en';

export type MotionCategory =
  | 'tamin_khaste'      // قرار تأمین خواسته
  | 'dastoor_movaghat'  // قرار دستور موقت
  | 'karshenasi'        // قرار ارجاع امر به کارشناس
  | 'moayeneh_mahal'    // قرار معاینه و تحقیق محلی
  | 'mane_taghib'       // لایحه تقاضای قرار منع تعقیب
  | 'tovaghof_ejra'     // قرار توقیف عملیات اجرایی
  | 'custom';           // قرار یا لایحه سفارشی

export interface LegalParty {
  name: string;
  nationalId?: string;
  fatherName?: string;
  address?: string;
  role: 'applicant' | 'respondent'; // خواهان/شاکی یا خوانده/مشتکی‌عنه
}

export interface LegalMotionDocument {
  id: string;
  title: string;
  category: MotionCategory;
  courtBranch: string;
  caseNumber: string;
  filingDate: string;
  applicant: LegalParty;
  respondent: LegalParty;
  subject: string;
  legalArticles: string[];
  argumentsText: string;
  reliefSought: string; // خواسته دقیق یا تقاضای صدور قرار
  securityDeposit?: string; // خسارت احتمالی (برای تامین خواسته / دستور موقت)
  status: 'draft' | 'filed' | 'under_review' | 'granted' | 'rejected' | 'appealed';
}

export interface AmbiguityItem {
  id: string;
  category: 'mabie' | 'saman' | 'shart' | 'tahvil' | 'arbitration';
  titleFa: string;
  titleEn: string;
  riskLevel: 'high' | 'medium' | 'low';
  descriptionFa: string;
  descriptionEn: string;
  recommendationFa: string;
  recommendationEn: string;
  isAddressed: boolean;
}

export interface GhararAssessment {
  score: number; // 0 - 100
  riskRating: 'safe' | 'moderate' | 'high_risk' | 'invalid_gharar';
  summaryFa: string;
  summaryEn: string;
  items: AmbiguityItem[];
}

export interface WorkflowStage {
  id: number;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  timeframeFa: string;
  timeframeEn: string;
  iconName: string;
  statuteReference?: string;
}
