/**
 * Scholarship Central - Initial Scholarship Database
 * Categorized by:
 * - Pakistan Scholarships 🇵🇰
 * - International Scholarships 🌍
 * - Undergraduate Scholarships 🎓
 * - Master's Scholarships 📚
 * - PhD Scholarships 🏆
 * - Fully Funded Scholarships 💯
 * - Government Scholarships 🏛️
 * - Education Levels: School (SSC), College (HSSC), Undergraduate, Master's, PhD
 */

const INITIAL_SCHOLARSHIPS = [
  {
    id: "hec-ehsaas-undergrad-2026",
    title: "HEC Benazir Undergraduate Scholarship Project",
    institution: "Higher Education Commission (HEC) of Pakistan",
    country: "Pakistan",
    countryCode: "PK",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "undergraduate", "fully-funded", "government"],
    educationLevels: ["Undergraduate"],
    deadline: "2026-12-15",
    applyLink: "https://ehsaas.hec.gov.pk/",
    featured: true,
    summary: "Need-based full tuition fee and annual living stipend for low-income undergraduate students enrolled in 135+ public sector universities across Pakistan.",
    eligibility: [
      "Open to students from low-income families (family income below threshold PKR 45,000/month).",
      "Must be enrolled in 4-year or 5-year undergraduate degree programs at designated public universities.",
      "Special 50% quota reserved for female students and 2% quota for differently-abled students.",
      "Must have secured admission purely on merit."
    ],
    coverage: [
      "100% full university tuition fee waiver for the entire degree duration.",
      "Annual living stipend of PKR 50,000 to cover books, transport, and study materials.",
      "Health and on-campus facilitation allowance."
    ],
    documents: [
      "CNIC or B-Form copy",
      "Salary slips / Income certificate of father/guardian verified by Tehsildar or Union Council",
      "Utility bills of the last 6 months (Electricity, Gas, Water)",
      "Educational transcripts (Matric & Intermediate marksheets)",
      "University fee challan & student card"
    ]
  },
  {
    id: "lums-national-outreach-programme-2026",
    title: "LUMS National Outreach Programme (NOP) Scholarship",
    institution: "Lahore University of Management Sciences (LUMS)",
    country: "Pakistan",
    countryCode: "PK",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    isGovernment: false,
    isInternational: false,
    categories: ["pakistan", "undergraduate", "fully-funded"],
    educationLevels: ["College", "Undergraduate"],
    deadline: "2026-07-31",
    applyLink: "https://nop.lums.edu.pk/",
    featured: true,
    summary: "Prestigious initiative aimed at identifying bright, underprivileged students from remote corners of Pakistan for 100% scholarship at LUMS.",
    eligibility: [
      "Students who have completed Matric/O-Levels with at least 80% marks.",
      "Currently appearing in or completed Intermediate (FSc/FA/ICS/I.Com) Part-1.",
      "Family financial background requiring full financial assistance.",
      "Applicants from all provinces: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, GB, and AJK."
    ],
    coverage: [
      "100% full tuition fee waiver for 4-year BS degrees (Business, CS, Engineering, Humanities, Law, Sciences).",
      "Free on-campus hostel accommodation.",
      "Monthly living stipend, book allowances, and lab support.",
      "Free summer coaching camp and admission test preparation at LUMS."
    ],
    documents: [
      "Matric / O-Level marksheet (minimum 80% marks)",
      "First-year Intermediate result card",
      "Father/Guardian's authentic income verification documents",
      "Domicile certificate and Family Registration Certificate (FRC)",
      "Utility bills from the last three months"
    ]
  },
  {
    id: "peef-master-scholarship-2026",
    title: "Punjab Educational Endowment Fund (PEEF) Master's Scholarship",
    institution: "PEEF - Government of Punjab",
    country: "Pakistan",
    countryCode: "PK",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "masters", "fully-funded", "government"],
    educationLevels: ["Master's"],
    deadline: "2026-10-30",
    applyLink: "https://www.peef.org.pk/",
    featured: false,
    summary: "Scholarship program for talented and needy students pursuing regular Master's/MS/M.Phil degrees in partner universities of Punjab.",
    eligibility: [
      "Pakistani citizen possessing Punjab domicile.",
      "Secured at least 60% marks or minimum 2.5/4.0 CGPA in Graduation (BA/B.Sc/B.Com/BS/BBA).",
      "Passed examination from a Government or Partner Institution located in Punjab.",
      "Total monthly family income of parents must not exceed PKR 60,000."
    ],
    coverage: [
      "100% tuition fee paid directly to the university.",
      "Monthly living stipend PKR 4,000 for day scholars and PKR 8,000 for boarders.",
      "Research grant support for thesis work."
    ],
    documents: [
      "PEEF prescribed application form endorsed by Vice Chancellor/Registrar",
      "Graduation marksheet and degree",
      "Parent/guardian income certificate from employer or Gazetted Officer",
      "Punjab domicile and CNIC copy",
      "Hostel resident certificate if boarder"
    ]
  },
  {
    id: "hec-indigenous-phd-fellowship-2026",
    title: "HEC Indigenous 5000 PhD Fellowship Program Phase-III",
    institution: "Higher Education Commission (HEC) of Pakistan",
    country: "Pakistan",
    countryCode: "PK",
    level: "PhD",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "phd", "fully-funded", "government"],
    educationLevels: ["PhD"],
    deadline: "2026-09-15",
    applyLink: "https://hec.gov.pk/english/scholarshipsgrants/lao/IPFP/",
    featured: true,
    summary: "Premier domestic doctoral research fellowship program aimed at developing high-caliber PhD researchers in Pakistani universities.",
    eligibility: [
      "Pakistani / AJK nationals with minimum 16 years of education (MS / M.Phil).",
      "Minimum 3.0 out of 4.0 CGPA or 1st Division in the terminal degree.",
      "Valid HEC HAT (Higher Education Aptitude Test) score with minimum 50% percentile.",
      "Maximum age 35 years (relaxed to 40 for regular faculty and government employees)."
    ],
    coverage: [
      "Monthly stipend of PKR 45,000 throughout the PhD duration (up to 4 years).",
      "Full university tuition fee, laboratory consumables, and library fees.",
      "Book allowance PKR 30,000/year and thesis write-up grant PKR 50,000.",
      "Funding for participation in one international research conference."
    ],
    documents: [
      "HEC HAT Scorecard",
      "All attested academic degrees from Matriculation to MS/M.Phil",
      "Research proposal / Concept note approved by PhD supervisor",
      "University enrollment letter for PhD program",
      "No Objection Certificate (NOC) from employer (if employed)"
    ]
  },
  {
    id: "peef-special-quota-matric-intermediate",
    title: "PEEF Special Quota Scholarships for School & College Students",
    institution: "The Punjab Educational Endowment Fund",
    country: "Pakistan",
    countryCode: "PK",
    level: "School",
    fundingType: "Partially Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "government"],
    educationLevels: ["School", "College"],
    deadline: "2026-08-31",
    applyLink: "https://www.peef.org.pk/special-quota-scholarships",
    featured: false,
    summary: "Financial grants reserved for orphan students, children of Grade 1-4 government servants, minority students, and special children passing Matric & Intermediate.",
    eligibility: [
      "Students who have passed Matriculation (SSC) or Intermediate (HSSC) with at least 60% marks.",
      "Enrolled in a regular educational institution for Intermediate (College) or Graduation (University).",
      "Eligible categories: Orphan students, children of low-grade employees (Scale 1-4), minority students, differently-abled.",
      "Family income does not exceed PKR 40,000 per month."
    ],
    coverage: [
      "Quarterly educational stipends covering tuition and textbook costs.",
      "Special mobility support for differently-abled students.",
      "Boarding allowance for students staying in recognized college/school hostels."
    ],
    documents: [
      "Matric / Inter official gazetted result card",
      "Father's death certificate (for orphans) or salary slip (for Scale 1-4 employees)",
      "Disability certificate issued by Medical Board (if applicable)",
      "Minority verification certificate (if applicable)",
      "Admission confirmation in College/Higher Secondary School"
    ]
  },
  {
    id: "fbise-merit-scholarship-scheme",
    title: "FBISE Talent Merit Scholarship for Matric & Inter Top Scorers",
    institution: "Federal Board of Intermediate & Secondary Education (FBISE)",
    country: "Pakistan",
    countryCode: "PK",
    level: "College",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "government"],
    educationLevels: ["School", "College"],
    deadline: "2026-09-30",
    applyLink: "https://www.fbise.edu.pk/scholarship.php",
    featured: false,
    summary: "Merit-based financial incentives awarded annually to high-achieving SSC (Matric) and HSSC (Intermediate) position holders across Federal Board institutions.",
    eligibility: [
      "Passed SSC Part-II or HSSC Part-II examinations through Federal Board with distinction (A1 Grade).",
      "Ranked in top merit positions in Science, General Science, Humanities, or Pre-Engineering/Pre-Medical groups.",
      "Enrolled as a regular student in the next higher tier of education in a recognized college/university."
    ],
    coverage: [
      "Lump-sum annual merit grant of PKR 60,000.",
      "Exemption from board examination fees for subsequent years.",
      "Merit certificate of academic excellence signed by Federal Minister of Education."
    ],
    documents: [
      "FBISE Original Result Card copy",
      "Admission verification form from current college or university",
      "National Identity Card / B-Form copy",
      "Bank Account details for direct scholarship disbursement"
    ]
  },
  {
    id: "balochistan-hec-undergrad-postgrad-2026",
    title: "Aghaz-e-Haqooq-e-Balochistan & FATA HEC Scholarship Scheme",
    institution: "HEC & Ministry of Federal Education",
    country: "Pakistan",
    countryCode: "PK",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "undergraduate", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Undergraduate", "Master's", "PhD"],
    deadline: "2026-11-20",
    applyLink: "https://hec.gov.pk/english/scholarshipsgrants/bfata/",
    featured: false,
    summary: "Dedicated federal scholarship initiative providing full funding to Balochistan and merged tribal districts students in premier Pakistani universities.",
    eligibility: [
      "Must hold valid domicile/local certificate of Balochistan Province or Merged Tribal Districts (ex-FATA).",
      "Minimum 50% marks in intermediate for undergraduate, and 16-year degree for postgraduate.",
      "Must appear in the HEC Aptitude Test conducted by Education Testing Council (ETC)."
    ],
    coverage: [
      "Full tuition fee waiver up to PKR 100,000 per semester.",
      "Living allowance PKR 18,000/month for undergraduate and PKR 25,000/month for postgraduate.",
      "Annual book and stationery allowance PKR 20,000.",
      "One-time initial settlement grant."
    ],
    documents: [
      "Local / Domicile Certificate issued by Deputy Commissioner",
      "Academic credentials (DMC, Sanad, Degrees)",
      "ETC HEC Test roll number slip and result sheet",
      "Provisional admission offer letter from designated university"
    ]
  },
  {
    id: "fulbright-foreign-student-usa-2027",
    title: "Fulbright Foreign Student Program (USA) 2026-2027",
    institution: "USEFP & United States Department of State",
    country: "United States",
    countryCode: "US",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Master's", "PhD"],
    deadline: "2026-05-13",
    applyLink: "https://usefp.org/scholarships/fulbright-degree.cfm",
    featured: true,
    summary: "The flagship international exchange scholarship funded by the US Department of State, covering full Master's and PhD programs at top US universities.",
    eligibility: [
      "Open to Pakistani citizens residing and working in Pakistan.",
      "For Master's: 16 years of formal education (BS 4-year or MA/MSc) with minimum 2.5 CGPA or second division.",
      "For PhD: 18 years of formal education (MS/M.Phil) with strong research background.",
      "GRE General test score is mandatory (or Duolingo/TOEFL requirements per cycle).",
      "Commitment to return to Pakistan upon completion of the degree to serve for at least 2 years."
    ],
    coverage: [
      "100% full tuition fees at Ivy League and top US universities.",
      "Monthly living stipend tailored to the US city cost of living.",
      "Comprehensive health, accident, and travel insurance.",
      "Round-trip international airfare tickets (Pakistan to USA and return).",
      "Textbook allowance, computer grant, and settling-in allowance.",
      "J-1 visa sponsorship and pre-departure cultural orientation."
    ],
    documents: [
      "Completed online USEFP application form",
      "Statement of Purpose (Personal Statement) & Study Objective essays",
      "Three letters of recommendation from professors or professional supervisors",
      "GRE scorecard and officially attested transcripts/degrees",
      "Detailed academic CV / resume"
    ]
  },
  {
    id: "chevening-scholarship-uk-2026-2027",
    title: "Chevening UK Government Scholarship 2026/2027",
    institution: "Foreign, Commonwealth & Development Office (FCDO) - UK",
    country: "United Kingdom",
    countryCode: "GB",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "fully-funded", "government"],
    educationLevels: ["Master's"],
    deadline: "2026-11-05",
    applyLink: "https://www.chevening.org/scholarships/",
    featured: true,
    summary: "The UK government's global scholarship programme offering emerging leaders full funding for any one-year taught Master's degree at any UK university.",
    eligibility: [
      "Citizen of a Chevening-eligible country (including Pakistan).",
      "Completed an undergraduate degree that qualifies for entry into a UK postgraduate course (equivalent to UK 2:1 honours).",
      "At least two years of demonstrable work experience (minimum 2,800 hours).",
      "Apply to three different eligible UK university courses and receive an unconditional offer from one.",
      "Commitment to return to country of citizenship for a minimum of two years."
    ],
    coverage: [
      "Full university tuition fees (including MBA caps).",
      "Monthly living allowance / stipend.",
      "Economy class round-trip travel tickets to and from the UK.",
      "Arrival allowance and homeward departure allowance.",
      "Cost of one UK Student visa application and travel grant to Chevening events."
    ],
    documents: [
      "Four leadership and networking essays (500 words each)",
      "Two professional or academic reference letters",
      "Undergraduate degree certificates and full transcripts",
      "Three chosen UK university courses options",
      "Valid passport"
    ]
  },
  {
    id: "daad-epos-helmut-schmidt-germany",
    title: "DAAD EPOS / Helmut-Schmidt Scholarship (Germany)",
    institution: "German Academic Exchange Service (DAAD)",
    country: "Germany",
    countryCode: "DE",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Master's", "PhD"],
    deadline: "2026-07-31",
    applyLink: "https://www2.daad.de/deutschland/stipendien/datenbank/en/21148-scholarship-database/",
    featured: true,
    summary: "DAAD developmental scholarships supporting graduates from developing countries for Master's and PhD programs taught in English and German in Germany.",
    eligibility: [
      "Hold a Bachelor's degree (usually 4 years) in a related discipline completed within the last 6 years.",
      "At least two years of relevant professional work experience in public, NGO, or private sector.",
      "English proficiency certificate (IELTS 6.5+ or TOEFL iBT 80+) or German language certificate depending on course."
    ],
    coverage: [
      "Monthly scholarship payment of €934 for Master's and €1,300 for Doctoral candidates.",
      "Payments towards health, accident, and personal liability insurance in Germany.",
      "Round-trip travel allowance / flight tickets.",
      "One-off study and research subsidy, plus mandatory 2-month free German language course."
    ],
    documents: [
      "Signed DAAD application form and Europass CV",
      "Letter of Motivation detailing academic and development goals",
      "Current employer recommendation letter with official letterhead",
      "Certified copies of university diplomas and transcript of records",
      "Proof of English/German language proficiency"
    ]
  },
  {
    id: "turkiye-burslari-scholarships-2026",
    title: "Türkiye Bursları Government Scholarship 2026-2027",
    institution: "Presidency for Turks Abroad and Related Communities (YTB)",
    country: "Turkey",
    countryCode: "TR",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "undergraduate", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Undergraduate", "Master's", "PhD"],
    deadline: "2026-02-20",
    applyLink: "https://turkiyeburslari.gov.tr/",
    featured: true,
    summary: "Competitive, government-funded Turkish scholarship providing direct university placement, free tuition, accommodation, and stipend at Turkish universities.",
    eligibility: [
      "Open to citizens of all countries except Turkish citizens.",
      "Minimum academic achievement: 70% for Undergraduate, 75% for Master's & PhD, 90% for Health Sciences (Medicine/Dentistry/Pharmacy).",
      "Age limits: Under 21 for Bachelor's, under 30 for Master's, under 35 for PhD."
    ],
    coverage: [
      "Guaranteed university and program placement at top Turkish institutions.",
      "100% full tuition fee coverage.",
      "Free university student dormitory accommodation.",
      "Monthly stipend: 3,500 TL (Undergrad), 5,000 TL (Master's), 6,500 TL (PhD).",
      "One-year preparatory Turkish language course (TÖMER).",
      "General health insurance and one-time round-trip flight ticket."
    ],
    documents: [
      "Valid passport or National ID card",
      "Recent passport-style photograph",
      "Graduation certificate / provisional degree",
      "Official academic transcripts showing cumulative grades",
      "Statement of purpose and academic research proposal (for Master's & PhD)"
    ]
  },
  {
    id: "stipendium-hungaricum-hec-2027",
    title: "Stipendium Hungaricum Scholarship Programme (Hungary)",
    institution: "Tempus Public Foundation & HEC Bilateral Exchange",
    country: "Hungary",
    countryCode: "HU",
    level: "Undergraduate",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "undergraduate", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Undergraduate", "Master's", "PhD"],
    deadline: "2027-01-15",
    applyLink: "https://stipendiumhungaricum.hu/",
    featured: false,
    summary: "Bilateral agreement between the Government of Hungary and HEC Pakistan offering hundreds of annual scholarships in Science, Engineering, Medicine, and Humanities.",
    eligibility: [
      "Pakistani and AJK nationals.",
      "Must apply simultaneously on both HEC Scholarship Portal and Tempus DreamApply portal.",
      "Must take the HEC Higher Education Aptitude Test (HAT) or USAT test.",
      "Relevant educational background for Bachelor's (12 years), Master's (16 years), or PhD (18 years)."
    ],
    coverage: [
      "Tuition-free education in English at premier Hungarian universities.",
      "Monthly stipend: HUF 43,700 for Bachelor's/Master's; HUF 140,000 to HUF 180,000 for PhD.",
      "Free dormitory place or housing contribution allowance of HUF 40,000/month.",
      "Comprehensive medical health insurance up to HUF 65,000 per year."
    ],
    documents: [
      "Online DreamApply application form and HEC portal application",
      "Motivational letter and study plan",
      "Proof of language proficiency (IELTS or English proficiency certificate)",
      "Attested school and university diplomas with transcripts",
      "Medical fitness certificate"
    ]
  },
  {
    id: "mext-japanese-government-scholarship-2027",
    title: "MEXT Japanese Government Scholarship (Research & Undergraduate)",
    institution: "Ministry of Education, Culture, Sports, Science and Technology (MEXT) - Japan",
    country: "Japan",
    countryCode: "JP",
    level: "PhD",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "undergraduate", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Undergraduate", "Master's", "PhD"],
    deadline: "2026-05-30",
    applyLink: "https://www.pk.emb-japan.go.jp/itpr_en/MEXT_Scholarship.html",
    featured: false,
    summary: "Prestigious full scholarship by the Government of Japan routed through the Embassy of Japan in Islamabad for undergraduate and research graduate students.",
    eligibility: [
      "Pakistani nationality.",
      "Research category: Under 35 years of age with 16 or 18 years of education.",
      "Undergraduate category: Between 17 and 25 years with 12 years of formal schooling.",
      "Willingness to learn the Japanese language and immerse in Japanese culture."
    ],
    coverage: [
      "100% full tuition and entrance examination fees waived.",
      "Monthly allowance of 143,000 JPY to 145,000 JPY (living stipend).",
      "Round-trip airfare from Pakistan (Islamabad/Karachi) to Tokyo.",
      "Intensive 6-month Japanese language preparatory training."
    ],
    documents: [
      "MEXT prescribed application forms",
      "Field of study and research program plan (detailed concept paper)",
      "Official academic transcripts and graduation diplomas",
      "Recommendation letter from the Dean/Professor of the last university",
      "Medical health certificate signed by an authorized physician"
    ]
  },
  {
    id: "erasmus-mundus-joint-masters-2027",
    title: "Erasmus Mundus Joint Master Degrees (EMJMD) - European Union",
    institution: "European Education and Culture Executive Agency (EACEA)",
    country: "European Union",
    countryCode: "EU",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "fully-funded", "government"],
    educationLevels: ["Master's"],
    deadline: "2027-01-31",
    applyLink: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    featured: true,
    summary: "Study across 2 to 4 different European countries with a prestigious EU scholarship covering all tuition, mobility expenses, and high monthly living allowances.",
    eligibility: [
      "Open to students worldwide, with Pakistan regularly emerging as one of the top recipient countries.",
      "First higher education degree (Bachelor's / BS / 16 years education).",
      "Strong academic record, motivation letter tailored to the specific consortium.",
      "Must fulfill specific consortium requirements (e.g., Computer Science, Robotics, Public Health, Environmental Policy)."
    ],
    coverage: [
      "Full participation costs and tuition fees for the entire joint degree.",
      "Monthly subsistence allowance of €1,400 per month for the duration of the program (up to 24 months).",
      "Travel costs, visa expenses, and worldwide health insurance.",
      "Multiple or joint Master's degrees awarded by top European universities."
    ],
    documents: [
      "Bachelor's degree certificate and academic transcripts",
      "Curriculum Vitae (Europass format)",
      "Consortium-specific motivation letter and research interest statement",
      "Two academic recommendation letters",
      "Proof of English proficiency (IELTS / TOEFL)"
    ]
  },
  {
    id: "australia-awards-scholarships-2027",
    title: "Australia Awards Scholarships (DFAT) 2026/2027",
    institution: "Department of Foreign Affairs and Trade (DFAT) - Australia",
    country: "Australia",
    countryCode: "AU",
    level: "Master's",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "fully-funded", "government"],
    educationLevels: ["Master's"],
    deadline: "2026-04-30",
    applyLink: "https://www.dfat.gov.au/people-to-people/australia-awards",
    featured: false,
    summary: "Long-term development awards administered by the Australian Government offering full Master's degrees in areas that contribute to Pakistan's development.",
    eligibility: [
      "Pakistani citizen residing in Pakistan.",
      "At least 16 years of education with equivalent Bachelor's degree.",
      "Minimum 5 years of relevant professional work experience in prioritized sectors (water security, agriculture, public policy, education).",
      "Commitment to return to Pakistan for at least two years after completion."
    ],
    coverage: [
      "Full tuition fees for Master's program in Australian universities.",
      "Return economy air travel to and from Australia.",
      "Establishment allowance of AUD 5,000 towards accommodation and textbooks.",
      "Fortnightly Contribution to Living Expenses (CLE) stipend.",
      "Overseas Student Health Cover (OSHC) and Introductory Academic Program (IAP)."
    ],
    documents: [
      "Certified copies of degree certificates and transcripts",
      "Employment verification certificates and detailed CV",
      "Development Impact Plan detailing how study will benefit Pakistan",
      "IELTS Academic certificate (minimum 6.5 overall, no band less than 6.0)",
      "Referee reports from employer"
    ]
  },
  {
    id: "csc-chinese-government-scholarship-silk-road",
    title: "Chinese Government Scholarship (CSC) - Silk Road Program",
    institution: "China Scholarship Council (CSC) & Ministry of Education China",
    country: "China",
    countryCode: "CN",
    level: "PhD",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "masters", "phd", "fully-funded", "government"],
    educationLevels: ["Master's", "PhD"],
    deadline: "2026-04-15",
    applyLink: "https://www.campuschina.org/",
    featured: false,
    summary: "Full government scholarship supporting students from Belt and Road countries, especially Pakistan, for postgraduate study in leading Chinese universities.",
    eligibility: [
      "Pakistani citizen in good physical and mental health.",
      "Under 35 years old for Master's; under 40 years old for Doctoral programs.",
      "Bachelor's degree for Master's applicants; Master's degree for PhD applicants."
    ],
    coverage: [
      "100% full tuition fee waiver.",
      "Free university dormitory accommodation or private accommodation subsidy.",
      "Monthly living stipend: CNY 3,000 for Master's and CNY 3,500 for PhD.",
      "Comprehensive medical insurance."
    ],
    documents: [
      "CSC Online Application Form (Type A via HEC or Type B directly to University)",
      "Notarized highest diploma and academic transcripts",
      "Study Plan or Research Proposal (minimum 800 words)",
      "Two recommendation letters from professors or associate professors",
      "Foreigner Physical Examination Form and Police Clearance Certificate"
    ]
  },
  {
    id: "nust-financial-aid-need-merit",
    title: "NUST Need-Based Financial Aid & Merit Scholarship Program",
    institution: "National University of Sciences & Technology (NUST)",
    country: "Pakistan",
    countryCode: "PK",
    level: "Undergraduate",
    fundingType: "Partially Funded",
    isGovernment: true,
    isInternational: false,
    categories: ["pakistan", "undergraduate", "government"],
    educationLevels: ["Undergraduate"],
    deadline: "2026-07-25",
    applyLink: "https://nust.edu.pk/admissions/financial-aid/",
    featured: false,
    summary: "Comprehensive financial assistance initiative ensuring no student admitted to NUST on merit drops out due to inability to afford university dues.",
    eligibility: [
      "Admitted into NUST undergraduate programs through the NET entrance test.",
      "Demonstrated financial need assessed by the NUST Financial Aid Committee.",
      "Family gross income evaluated against expenditure, dependents, and siblings' tuition."
    ],
    coverage: [
      "Partial to 100% tuition fee waiver depending on assessed need bracket.",
      "Subsidized university hostel accommodation and mess dues.",
      "Interest-free student loans (Qarz-e-Hasna) repayable after graduation."
    ],
    documents: [
      "NUST Financial Aid Form (NFAF)",
      "Income proof of parents / guardians with tax return copies",
      "Utility bills (last 6 months) and bank statement (last 1 year)",
      "Rental agreement (if residing in rented house)",
      "Fee slips of studying siblings"
    ]
  },
  {
    id: "gates-cambridge-scholarship-uk",
    title: "Gates Cambridge Scholarship (University of Cambridge)",
    institution: "Bill & Melinda Gates Foundation & University of Cambridge",
    country: "United Kingdom",
    countryCode: "GB",
    level: "PhD",
    fundingType: "Fully Funded",
    isGovernment: false,
    isInternational: true,
    categories: ["international", "masters", "phd", "fully-funded"],
    educationLevels: ["Master's", "PhD"],
    deadline: "2026-12-03",
    applyLink: "https://www.gatescambridge.org/",
    featured: true,
    summary: "Prestigious global scholarship for outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject at Cambridge.",
    eligibility: [
      "Citizen of any country outside the United Kingdom (Pakistani students highly encouraged).",
      "Applying to pursue a full-time PhD, MSc/MLitt, or one-year postgraduate course at Cambridge.",
      "Exceptional academic excellence, leadership potential, and commitment to improving the lives of others."
    ],
    coverage: [
      "The University Composition Fee at the appropriate rate.",
      "A maintenance allowance for a single student (£20,000 per year at current rates).",
      "One economy single airfare at both the beginning and end of the course.",
      "Inbound visa costs & Immigration Health Surcharge (IHS).",
      "Academic development funding up to £2,000 for conferences and courses.",
      "Family allowance and maternity/paternity funding if applicable."
    ],
    documents: [
      "Cambridge Graduate Application via the Applicant Portal",
      "Gates Cambridge Statement (500 words outlining fit with scholarship criteria)",
      "Research Proposal (for all PhD applicants)",
      "Gates Cambridge Reference in addition to two academic references",
      "Transcripts, CV, and sample of written work"
    ]
  },
  {
    id: "aku-financial-assistance-mbbs",
    title: "Aga Khan University (AKU) Need-Based Financial Assistance",
    institution: "Aga Khan University Medical College",
    country: "Pakistan",
    countryCode: "PK",
    level: "Undergraduate",
    fundingType: "Partially Funded",
    isGovernment: false,
    isInternational: false,
    categories: ["pakistan", "undergraduate"],
    educationLevels: ["Undergraduate"],
    deadline: "2026-08-15",
    applyLink: "https://www.aku.edu/admissions/fees-and-funding/pages/financial-assistance.aspx",
    featured: false,
    summary: "Needs-blind admission policy ensuring every student selected for MBBS, Nursing, or Midwifery at AKU receives adequate financial assistance.",
    eligibility: [
      "Successfully cleared the AKU admission test and interviews on pure merit.",
      "Family demonstrates genuine financial constraint in meeting tuition and hostel costs.",
      "Assistance awarded regardless of nationality, gender, or religious background."
    ],
    coverage: [
      "Up to 100% combination of grant (tuition waiver) and interest-free loan.",
      "Hostel accommodation subsidies for students from interior Sindh, KP, Balochistan, and GB.",
      "Books and clinical equipment subsidies."
    ],
    documents: [
      "Completed AKU Financial Aid Application form",
      "Verified parents' income certificates, tax returns, and wealth statements",
      "Bank statements of all adult family members for the last 12 months",
      "Utility bills and property ownership or rental documents"
    ]
  },
  {
    id: "singapore-international-graduate-award-singa",
    title: "Singapore International Graduate Award (SINGA) PhD",
    institution: "A*STAR, NTU, NUS & SUTD - Singapore",
    country: "Singapore",
    countryCode: "SG",
    level: "PhD",
    fundingType: "Fully Funded",
    isGovernment: true,
    isInternational: true,
    categories: ["international", "phd", "fully-funded", "government"],
    educationLevels: ["PhD"],
    deadline: "2026-12-01",
    applyLink: "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    featured: false,
    summary: "World-class doctoral research training in Biomedical Sciences, Computing, Physical Sciences and Engineering at NUS, NTU, SUTD or A*STAR labs.",
    eligibility: [
      "Open to all international graduates with passion for research and excellent academic results.",
      "Good skills in written and spoken English.",
      "Strong reports from academic referees."
    ],
    coverage: [
      "Full tuition fees covered for 4 years of PhD studies.",
      "Monthly stipend of SGD 2,700, increased to SGD 3,200 after passing the qualifying exam.",
      "One-time airfare grant of up to SGD 1,500.",
      "One-time settling-in allowance of SGD 1,000."
    ],
    documents: [
      "Valid passport",
      "All academic transcripts in English translation",
      "Bachelor's and/or Master's graduation certificates",
      "Two academic recommendation reports submitted online by referees"
    ]
  }
];

// Helper functions for storage and management
const STORAGE_KEY = "scholarship_hub_items_v1";

function getStoredScholarships() {
  try {
    const custom = localStorage.getItem(STORAGE_KEY);
    if (!custom) {
      return [...INITIAL_SCHOLARSHIPS];
    }
    const parsed = JSON.parse(custom);
    // Combine custom (newest first) and initial scholarships, avoiding duplicate IDs
    const customIds = new Set(parsed.map(item => item.id));
    const defaults = INITIAL_SCHOLARSHIPS.filter(item => !customIds.has(item.id));
    return [...parsed, ...defaults];
  } catch (err) {
    console.error("Failed to load scholarships from localStorage:", err);
    return [...INITIAL_SCHOLARSHIPS];
  }
}

function saveCustomScholarship(newItem) {
  try {
    const custom = localStorage.getItem(STORAGE_KEY);
    let list = custom ? JSON.parse(custom) : [];
    // Prepend new item
    list = [newItem, ...list.filter(x => x.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (err) {
    console.error("Failed to save scholarship to localStorage:", err);
    return false;
  }
}

function deleteStoredScholarship(id) {
  try {
    const custom = localStorage.getItem(STORAGE_KEY);
    if (!custom) return false;
    let list = JSON.parse(custom);
    list = list.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (err) {
    console.error("Failed to delete scholarship:", err);
    return false;
  }
}
