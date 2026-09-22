import { LegalMotionDocument, AmbiguityItem, WorkflowStage } from '../types';

export const INITIAL_PRESETS: Record<string, Partial<LegalMotionDocument>> = {
  tamin_khaste: {
    category: 'tamin_khaste',
    title: 'درخواست صدور قرار تأمین خواسته توقیف اموال',
    subject: 'تقاضای صدور قرار تأمین خواسته معادل مبلغ ۲,۵۰۰,۰۰۰,۰۰۰ ریال از اموال و حساب‌های بانکی خوانده',
    courtBranch: 'شعبه ۱۲ دادگاه عمومی حقوقی مجتمع قضایی شهید بهشتی تهران',
    caseNumber: '۱۴۰۳۹۱۰۰۰۲۳۴۱۸',
    filingDate: '۱۴۰۳/۰۷/۱۰',
    legalArticles: [
      'ماده ۱۰۸ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی (بند ب و د)',
      'ماده ۱۱۰ قانون آیین دادرسی مدنی (تودیع خسارت احتمالی)',
      'ماده ۱۱۷ قانون آیین دادرسی مدنی (اجرای قرار پیش از ابلاغ به دلیل بیم تضییع خواسته)'
    ],
    applicant: {
      name: 'محمدرضا سلیمانی',
      nationalId: '۰۰۷۶۵۴۳۲۱۰',
      fatherName: 'احمد',
      address: 'تهران، خیابان شریعتی، بالاتر از پل رومی، پلاک ۴۲',
      role: 'applicant'
    },
    respondent: {
      name: 'شرکت تجارت نوین سامان (با مسئولیت محدود)',
      nationalId: '۱۰۱۰۳۴۵۸۹۲۱',
      fatherName: '-',
      address: 'تهران، میدان ونک، برج نگار، طبقه ۸، واحد ۳',
      role: 'respondent'
    },
    argumentsText: `ریاست محترم دادگاه عمومی حقوقی،
با سلام و احترام، به استحضار عالی می‌رساند:
۱. اینجانب به موجب قرارداد رسمی مشارکت مورخ ۱۴۰۲/۱۱/۱۵، مبالغی را بابت سرمایه‌گذاری در خط تولید به شرکت خوانده پرداخت نموده‌ام و موعد عودت اصل سرمایه و سود متعلقه به تاریخ ۱۴۰۳/۰۵/۰۱ منقضی گردیده است.
۲. علی‌رغم مراجعات مکرر و ارسال اظهارنامه رسمی شماره ۱۴۰۳۲۲۰۱۰۰۲۳۹ به خوانده محترم، مشارالیه از استرداد وجوه استنکاف نموده و طبق اطلاعات واصله، در حال تبدیل و خروج دارایی‌ها و انتقال حساب‌های بانکی خود می‌باشد.
۳. نظر به اینکه دعوا مستند به سند عادی و در معرض تضییع و تفریط قرار دارد، مستنداً به بند (د) ماده ۱۰۸ و ماده ۱۱۷ قانون آیین دادرسی مدنی، استدعای رسیدگی فوری و صدور قرار تأمین خواسته توقیف پلاک ثبتی یا حساب‌های بانکی خوانده تا سقف خواسته را دارم. اینجانب آمادگی کامل خود را جهت تودیع خسارت احتمالی اعلام می‌دارم.`,
    reliefSought: 'صدور قرار فوری تأمین خواسته و اجرای آن قبل از ابلاغ به خوانده مستنداً به ماده ۱۱۷ قانون آیین دادرسی مدنی',
    securityDeposit: '۱۰٪ الی ۲۰٪ ارزش خواسته طبق نظر و تصمیم ریاست شعبه',
    status: 'draft'
  },
  dastoor_movaghat: {
    category: 'dastoor_movaghat',
    title: 'تقاضای صدور قرار دستور موقت منع عملیات ساختمانی',
    subject: 'درخواست دستور موقت مبنی بر جلوگیری از ادامه گودبرداری غیرمجاز و خطرآفرین در ملک مجاور',
    courtBranch: 'شعبه ۲۴ دادگاه عمومی حقوقی تهران',
    caseNumber: '۱۴۰۳۹۱۰۰۰۴۱۱۹۲',
    filingDate: '۱۴۰۳/۰۷/۱۲',
    legalArticles: [
      'ماده ۳۱۰ قانون آیین دادرسی مدنی (فوریت در امر موضوع دستور موقت)',
      'ماده ۳۱۶ قانون آیین دادرسی مدنی (توقیف مال یا انجام یا منع انجام عمل)',
      'ماده ۳۱۹ قانون آیین دادرسی مدنی (تودیع تأمین خسارت احتمالی)'
    ],
    applicant: {
      name: 'دکتر علیرضا فرهمند',
      nationalId: '۰۴۵۱۱۲۳۴۵۶',
      fatherName: 'منوچهر',
      address: 'تهران، زعفرانیه، خیابان آصف، کوچه دهم، پلاک ۱۴',
      role: 'applicant'
    },
    respondent: {
      name: 'مهندس کیوان رادمنش (مالک و مجری ملک پلاک ثبتی ۱۲۳۴/۴۵)',
      nationalId: '۰۰۵۹۸۷۶۵۴۳',
      fatherName: 'بیژن',
      address: 'تهران، زعفرانیه، خیابان آصف، مجاور پلاک ۱۴',
      role: 'respondent'
    },
    argumentsText: `ریاست محترم دادگاه،
احتراماً به استحضار می‌رساند:
خوانده محترم در ملک همجوار پلاک متعلق به موکل اقدام به گودبرداری عمیق غیراصولی (به عمق ۱۸ متر) نموده که موجب ترک‌خوردگی شدید دیوارها و سقف ساختمان مسکونی موکل گردیده و هر لحظه خطر ریزش بنا و تلفات جانی و مالی می‌رود.
با توجه به فوریت حیاتی امر و گزارش تأمین دلیل کارشناس رسمی مورخ ۱۴۰۳/۰۷/۰۸ پیوست پرونده، مستنداً به مواد ۳۱۰ و ۳۱۶ ق.آ.د.م تقاضای صدور دستور موقت فوری دایر بر توقف کلیه عملیات ساختمانی و پایدارسازی دیواره‌های گودبرداری تا تعیین تکلیف نهایی دعوا مورد استدعاست.`,
    reliefSought: 'صدور قرار دستور موقت بر توقف کامل فعالیت ساختمانی و ایمن‌سازی فوری گود',
    securityDeposit: 'تودیع تأمین مناسب به صلاحدید مقام محترم قضایی',
    status: 'under_review'
  },
  karshenasi: {
    category: 'karshenasi',
    title: 'لایحه تقاضای صدور قرار ارجاع امر به کارشناس رسمی دادگستری',
    subject: 'درخواست قرار کارشناسی جهت تعیین و برآورد دقیق میزان خسارات وارده به تأسیسات صنعتی',
    courtBranch: 'شعبه ۸ دادگاه عمومی حقوقی اصفهان',
    caseNumber: '۱۴۰۳۳۵۰۰۰۱۱۲۸۷',
    filingDate: '۱۴۰۳/۰۷/۱۵',
    legalArticles: [
      'ماده ۲۵۷ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی',
      'ماده ۲۵۹ قانون آیین دادرسی مدنی (پرداخت دستمزد کارشناس)',
      'ماده ۲۶۰ قانون آیین دادرسی مدنی (مهلت اظهارنظر و اعتراض)'
    ],
    applicant: {
      name: 'شرکت صنایع فولاد سپاهان گستر',
      nationalId: '۱۰۲۶۰۴۸۱۹۳۱',
      fatherName: '-',
      address: 'اصفهان، شهرک صنعتی مورچه‌خورت، خیابان رازی، فاز ۲',
      role: 'applicant'
    },
    respondent: {
      name: 'شرکت مهندسی فراساز پایدار',
      nationalId: '۱۰۸۶۱۱۵۹۰۴۲',
      fatherName: '-',
      address: 'اصفهان، خیابان شیخ صدوق شمالی، ساختمان فرشته',
      role: 'respondent'
    },
    argumentsText: `ریاست محترم شعبه،
در خصوص پرونده کلاسه فوق‌الذکر، نظر به اینکه تشخیص کیفیت متریال به کار رفته در سیستم‌های خنک‌کننده کارخانه و ارزیابی میزان عیوب فنی و برآورد ریالی خسارات، امری کاملاً تخصصی و فنی و خارج از حیطه معمول قضایی می‌باشد، استناداً به ماده ۲۵۷ قانون آیین دادرسی مدنی تقاضای صدور قرار ارجاع امر به کارشناس رسمی دادگستری در رشته تأسیسات ساختمانی و مکانیک با تعیین وظایف مشخص کارشناسی مورد استدعاست.`,
    reliefSought: 'صدور قرار ارجاع به کارشناس رسمی رشته تأسیسات و ماشین‌آلات صنعتی',
    securityDeposit: 'واریز هزینه کارشناسی علی‌الحساب ظرف مهلت قانونی',
    status: 'draft'
  },
  mane_taghib: {
    category: 'mane_taghib',
    title: 'لایحه دفاعیه و تقاضای صدور قرار منع تعقیب',
    subject: 'دفاع در برابر شکایت کلاهبرداری و درخواست صدور قرار منع تعقیب به لحاظ فقدان وصف کیفری',
    courtBranch: 'شعبه چهارم دادیاری / بازپرسی دادسرای عمومی و انقلاب ناحیه ۳ تهران',
    caseNumber: '۱۴۰۳۳۱۰۰۰۹۸۵۴۱',
    filingDate: '۱۴۰۳/۰۷/۱۸',
    legalArticles: [
      'ماده ۲۶۵ قانون آیین دادرسی کیفری (صدور قرار منع تعقیب)',
      'ماده ۴ قانون آیین دادرسی کیفری (اصل برائت و حق بر دفاع)',
      'ماده ۱ قانون تشدید مجازات مرتکبین ارتشاء، اختلاس و کلاهبرداری (عدم انطباق ارکان جرم)'
    ],
    applicant: {
      name: 'کامبیز ناصری (شاکی)',
      nationalId: '۰۰۴۹۹۲۲۱۱۸',
      fatherName: 'حسین',
      address: 'تهران، خیابان میرداماد، میدان مادر',
      role: 'applicant'
    },
    respondent: {
      name: 'مهدی یزدانی (مشتکی‌عنه)',
      nationalId: '۰۳۸۱۷۵۶۴۳۲',
      fatherName: 'رضا',
      address: 'تهران، خیابان پاسداران، بوستان پنجم',
      role: 'respondent'
    },
    argumentsText: `بازپرس محترم شعبه،
با سلام و ادای احترام،
در پاسخ به ادعای غیرواقعی شاکی محترم در پرونده اتهامی دایر بر کلاهبرداری، خاطرنشان می‌سازد:
۱. موضوع اختلاف فی‌مابین صرفاً ناشی از عدم انجام به موقع تعهد قراردادی فروش یک دستگاه خط بسته‌بندی بوده و هیچ‌گونه مانور متقلبانه‌ای از سوی موکل صورت نگرفته است.
۲. اختلاف طرفین ماهیتی کاملاً مدنی و حقوقی داشته و مشمول قواعد خسارت تأخیر تأدیه یا الزام به انجام تعهد در دادگاه حقوقی است، نه دادسرا.
۳. با توجه به فقدان سوءنیت خاص و عدم تحقق رکن مادی بزه کلاهبرداری، مستنداً به ماده ۲۶۵ قانون آیین دادرسی کیفری و اصل طلایی برائت (ماده ۴ ق.آ.د.ک)، تقاضای صدور قرار منع تعقیب موکل استدعا می‌شود.`,
    reliefSought: 'صدور قرار منع تعقیب به دلیل عدم احراز وقوع جرم و حقوقی بودن اختلاف',
    securityDeposit: 'بدون نیاز به تودیع خسارت',
    status: 'draft'
  }
};

export const GHARAR_RISK_CHECKLIST: AmbiguityItem[] = [
  {
    id: 'g1',
    category: 'mabie',
    titleFa: 'ابهام در اوصاف، مقدار و کیفیت مبیع (مورد معامله)',
    titleEn: 'Ambiguity in Subject Matter Specifications & Quantity',
    riskLevel: 'high',
    descriptionFa: 'ذکر عبارات کلی مانند «یک دستگاه آپارتمان مرغوب» یا «تعدادی قطعات صنعتی استاندارد» بدون ذکر پلاک ثبتی، متراژ دقیق، شماره سریال یا جدول مشخصات فنی موجب بطلان عقد به دلیل غرر و جهل به مبیع است (مواد ۱۹۰ و ۲۱۶ قانون مدنی).',
    descriptionEn: 'Vague terms without exact registry numbers, square meters, or technical blueprints void the contract under Gharar doctrine (excessive ambiguity).',
    recommendationFa: 'مشخصات کامل مبیع شامل پلاک ثبتی، قطعه، طبقه، متراژ طبق پروانه، مدل و برند دقیق در پیوست فنی قید و امضا شود.',
    recommendationEn: 'Specify exact land registry, floor, blueprints, serial numbers, and attach verified specifications sheet.',
    isAddressed: false
  },
  {
    id: 'g2',
    category: 'saman',
    titleFa: 'مجهول یا شناور بودن ثمن معامله بدون شاخص عینی',
    titleEn: 'Unspecified or Undetermined Price Without Index',
    riskLevel: 'high',
    descriptionFa: 'تعیین قیمت به صورت «قیمت روز هنگام تحویل» یا «توافق بعدی طرفین» بدون فرمول دقیق ریاضی یا شاخص رسمی بانک مرکزی از مصادیق بارز غرر و جهل به ثمن است (ماده ۳۳۸ قانون مدنی).',
    descriptionEn: 'Setting prices as "market rate on delivery" or "future mutual consent" introduces fatal price uncertainty.',
    recommendationFa: 'مبلغ کل به عدد و حروف مشخص شود؛ در صورت تعدیل قیمت، فرمول بر مبنای شاخص رسمی تورم یا قیمت رسمی بورس کالا شفاف گردد.',
    recommendationEn: 'State total price in written words & numbers; if variable, bind strictly to Central Bank inflation index or commodity exchange.',
    isAddressed: false
  },
  {
    id: 'g3',
    category: 'tahvil',
    titleFa: 'عدم تعیین مهلت و تاریخ مشخص تسلیم یا تحویل',
    titleEn: 'Absence of Firm Delivery Deadline',
    riskLevel: 'medium',
    descriptionFa: 'عباراتی نظیر «در اسرع وقت» یا «پس از آماده شدن سفارش» به دلیل نداشتن مبدأ و منتهای مشخص، عقد را در معرض تزلزل و غرری بودن قرار می‌دهد.',
    descriptionEn: 'Phrases like "as soon as possible" or "when ready" lack definite date bounds, creating legal vulnerability.',
    recommendationFa: 'تاریخ دقیق هجری شمسی (روز، ماه، سال) برای تسلیم مشخص شود و برای هر روز تأخیر خسارت وجه التزام روزانه تعیین گردد.',
    recommendationEn: 'Designate exact calendar date and insert daily liquidated damages for delay.',
    isAddressed: false
  },
  {
    id: 'g4',
    category: 'shart',
    titleFa: 'شرط معلق به امر مجهول یا در اختیار یکی از طرفین',
    titleEn: 'Condition Precedent Dependent on Ambiguous Events',
    riskLevel: 'medium',
    descriptionFa: 'مشروط کردن تعهد به شرطی که تحقق آن نامعلوم است (مانند «در صورت صلاحدید کارفرما» یا «پس از کسب سود مناسب») که طبق ماده ۲۳۳ قانون مدنی می‌تواند مفسد عقد باشد.',
    descriptionEn: 'Conditioning obligations on purely arbitrary or undetermined future conditions compromises contractual validity.',
    recommendationFa: 'شروط تعلیقی باید دارای معیار عینی، قابل اندازه‌گیری با مهلت انقضای صریح باشند.',
    recommendationEn: 'Ensure conditions precedent have objective external metrics with explicit sunset clauses.',
    isAddressed: false
  },
  {
    id: 'g5',
    category: 'arbitration',
    titleFa: 'فقدان شرط داوری یا مکانیسم حل اختلاف معین',
    titleEn: 'Missing Definite Dispute Resolution & Arbitration Mechanism',
    riskLevel: 'low',
    descriptionFa: 'نبود مرجع حل اختلاف یا استفاده از شرط داوری مبهم («داور مرضی‌الطرفین» بدون نحوه انتخاب در صورت بروز اختلاف) موجب بلاتکلیفی و اطاله دادرسی می‌شود.',
    descriptionEn: 'Ambiguous arbitration clauses without appointment mechanics cause prolonged litigation bottlenecks.',
    recommendationFa: 'نام داور منفرد یا مرکز داوری معتبر (مثل مرکز داوری اتاق بازرگانی) با مهلت داوری ۹۰ روزه درج شود.',
    recommendationEn: 'Name institutional arbitration center with defined 90-day ruling window and jurisdiction rules.',
    isAddressed: false
  }
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    titleFa: 'تنظیم و ثبت لایحه / دادخواست',
    titleEn: 'Motion Drafting & Electronic Filing',
    descFa: 'تنظیم متن دادخواست یا لایحه با استناد به مواد قانونی و ثبت از طریق دفاتر خدمات الکترونیک قضایی یا سامانه خودکاربری وکلا',
    descEn: 'Drafting legal petition with statutory grounds and e-filing via Judicial Electronic Services.',
    timeframeFa: '۱ الی ۲ روز کاری',
    timeframeEn: '1-2 business days',
    iconName: 'FileText',
    statuteReference: 'ماده ۴۸ قانون آیین دادرسی مدنی'
  },
  {
    id: 2,
    titleFa: 'ارجاع به شعبه و بررسی مقدماتی',
    titleEn: 'Court Assignment & Judicial Screening',
    descFa: 'ثبت در سیستم سمپ (CMS)، ارجاع توسط ریاست کل به شعبه مربوطه و مطالعه پرونده توسط دادرس یا بازپرس',
    descEn: 'Case intake through Judicial CMS, branch assignment, and preliminary bench review.',
    timeframeFa: '۲ الی ۵ روز کاری',
    timeframeEn: '2-5 business days',
    iconName: 'Clock',
    statuteReference: 'ماده ۶۴ قانون آیین دادرسی مدنی'
  },
  {
    id: 3,
    titleFa: 'تودیع خسارت احتمالی (در صورت نیاز)',
    titleEn: 'Security Deposit Escrow (If Mandated)',
    descFa: 'در قرارهای تأمین خواسته عادی یا دستور موقت، دادگاه میزان خسارت احتمالی را تعیین و متقاضی ظرف مهلت معین به حساب سپرده دادگستری واریز می‌کند',
    descEn: 'For attachment or preliminary injunctions, court orders collateral deposit deposited into judicial escrow.',
    timeframeFa: 'مهلت ۳ تا ۱۰ روزه',
    timeframeEn: '3-10 days deadline',
    iconName: 'ShieldAlert',
    statuteReference: 'ماده ۱۱۰ و ۳۱۹ قانون آیین دادرسی مدنی'
  },
  {
    id: 4,
    titleFa: 'انشای قرار قضایی و امضای الکترونیک',
    titleEn: 'Issuance & Judicial Digital Signing',
    descFa: 'قاضی شعبه متن قرار (تأمین خواسته، کارشناسی، دستور موقت یا منع تعقیب) را صادر و امضا می‌نماید',
    descEn: 'Presiding judge issues the formal interlocutory order with court seal and cryptographic signature.',
    timeframeFa: 'فوری (در امور فوری) تا ۷ روز',
    timeframeEn: 'Immediate (urgent) to 7 days',
    iconName: 'Stamp',
    statuteReference: 'ماده ۱۱۷ و ۳۱۸ قانون آیین دادرسی مدنی'
  },
  {
    id: 5,
    titleFa: 'ابلاغ الکترونیک در سامانه ثنا',
    titleEn: 'Electronic Notice via Sana Portal',
    descFa: 'ارسال پیامک و بارگذاری دادنامه/قرار در کارتابل ثنای طرفین دعوا جهت آغاز مهلت‌های قانونی',
    descEn: 'Official dispatch of decision via National Sana e-Judiciary Portal triggering statutory appeal clock.',
    timeframeFa: 'همان روز صدور قرار',
    timeframeEn: 'Same day of issuance',
    iconName: 'BellRing',
    statuteReference: 'ماده ۱۷۵ قانون آیین دادرسی کیفری'
  },
  {
    id: 6,
    titleFa: 'مهلت اعتراض / اجرای قرار در دایره اجرا',
    titleEn: 'Objection Window & Judicial Execution',
    descFa: 'مهلت ۱۰ روزه اعتراض به قرار تأمین یا ۲۰ روزه تجدیدنظرخواهی؛ در قرارهای فوری، اجرای قرار پیش از ابلاغ توسط اجرای احکام انجام می‌پذیرد',
    descEn: '10-day objection or 20-day appeal window; urgent orders undergo pre-notice enforcement by execution officers.',
    timeframeFa: '۱۰ الی ۲۰ روز فرجه قانونی',
    timeframeEn: '10-20 statutory days',
    iconName: 'CheckCircle2',
    statuteReference: 'ماده ۱۱۶ و ۳۲۵ قانون آیین دادرسی مدنی'
  }
];

export const STATUTE_ARTICLES_CATALOG = [
  {
    code: 'ماده ۱۰۸ ق.آ.د.م',
    title: 'موارد صدور قرار تأمین خواسته',
    description: 'خواهان می‌تواند قبل از تقدیم دادخواست یا ضمن دادخواست راجع به اصل دعوا یا در جریان دادرسی تا وقتی که حکم قطعی صادر نشده است در موارد زیر از دادگاه درخواست تأمین خواسته نماید: دعوا مستند به سند رسمی باشد، یا خواسته در معرض تضییع و تفریط باشد، یا در مواردی از قبیل اوراق تجاری واخواست شده باشد، یا خواهان خسارتی را که ممکن است به طرف مقابل وارد آید نقداً به صندوق دادگستری بپردازد.'
  },
  {
    code: 'ماده ۱۱۷ ق.آ.د.م',
    title: 'اجرای قرار تأمین خواسته قبل از ابلاغ',
    description: 'قرار تأمین به طرف دعوا ابلاغ می‌شود و پس از ابلاغ اجرا می‌گردد. در مواردی که ابلاغ فوری ممکن نباشد و تأخیر در اجرا موجب تضییع یا تفریط خواسته گردد، دادگاه می‌تواند دستور اجرای قرار را قبل از ابلاغ صادر نماید.'
  },
  {
    code: 'ماده ۳۱۰ ق.آ.د.م',
    title: 'دستور موقت و شرایط فوریت',
    description: 'در اموری که تعیین تکلیف آن فوریت دارد، دادگاه به درخواست ذی‌نفع برابر مواد زیر دستور موقت صادر می‌نماید.'
  },
  {
    code: 'ماده ۲۵۷ ق.آ.د.م',
    title: 'قرار ارجاع امر به کارشناس',
    description: 'دادگاه می‌تواند راساً یا به درخواست هر یک از اصحاب دعوا قرار ارجاع امر به کارشناس را صادر نماید. در قرار دادگاه، موضوعی که نظر کارشناس نسبت به آن لازم است و نیز مدتی که کارشناس باید اظهار عقیده کند، تعیین می‌گردد.'
  },
  {
    code: 'ماده ۲۶۵ ق.آ.د.ک',
    title: 'صدور قرار منع تعقیب در دادسرا',
    description: 'بازپرس در صورت جرم نبودن عمل ارتکابی و یا فقدان ادله کافی برای انتساب جرم به متهم، قرار منع تعقیب صادر و پرونده را فوری نزد دادستان ارسال می‌کند.'
  },
  {
    code: 'ماده ۱۹۰ و ۲۱۶ قانون مدنی',
    title: 'قاعده نفی غرر و لزوم معلوم بودن مورد معامله',
    description: 'برای صحت هر معامله شرایط اساسی لازم است از جمله معین بودن موضوع معامله. مورد معامله باید مبهم نباشد مگر در موارد مسامحه که علم اجمالی به آن کافی است.'
  }
];
