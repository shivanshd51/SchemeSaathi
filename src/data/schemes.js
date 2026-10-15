/**
 * SchemeSaathi Scheme Repository
 * 
 * Data Architecture:
 * - isVerified: boolean (true = verified government scheme with official .gov.in URL; false = pilot/demo sample entry)
 * - pilotLocation: { state, district, isPilotRegion }
 * - requirements: confirmed vs itemsToVerify
 * - documents: list of required records with verification status
 * - applicationSteps: step-by-step guidance with jargon explanations
 * - lastCheckedDate: ISO date string for trust auditing
 */

export const PILOT_REGIONS = [
  { state: "Maharashtra", district: "Pune", isDefault: true, activePilot: true },
  { state: "Uttar Pradesh", district: "Prayagraj", isDefault: false, activePilot: true },
  { state: "Maharashtra", district: "Mumbai Suburban", isDefault: false, activePilot: false },
  { state: "Madhya Pradesh", district: "Bhopal", isDefault: false, activePilot: true },
  { state: "Karnataka", district: "Bengaluru Urban", isDefault: false, activePilot: false },
  { state: "Delhi", district: "New Delhi", isDefault: false, activePilot: true }
];

export const CATEGORIES = [
  "All",
  "Government Schemes",
  "Startup/Entrepreneurship",
  "Skill & Employment",
  "AI & Digital",
  "Sustainability",
  "Women Empowerment",
  "Other"
];

export const SCHEMES_DATABASE = [
  {
    id: "maha-post-matric-scholarship",
    title: "Post-Matric Scholarship for Higher Education (MahaDBT)",
    shortDescription: "Tuition and exam fee reimbursement for eligible students pursuing degree or diploma courses in Maharashtra.",
    category: "Government Schemes",
    targetAudience: "Students (College / University)",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "State Level (Active in Pilot District Pune)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-12",
    officialSourceUrl: "https://mahadbt.maharashtra.gov.in",
    responsibleDepartment: "Social Justice and Special Assistance Department, Govt of Maharashtra",
    contactDetails: "Toll-Free Helpline: 022-49150800 (Mon–Sat 9 AM – 7 PM)",
    benefitSummary: "100% or partial tuition & examination fee reimbursement credited directly to the student or institution account via DBT.",
    matchRules: {
      minAge: 16,
      maxAge: 35,
      occupations: ["student"],
      maxFamilyIncome: 800000, // INR per year
      states: ["Maharashtra"],
      categories: ["Government Schemes"]
    },
    whyMatchedReason: "Matches your student status in Maharashtra and family income threshold for state higher education fee support.",
    eligibilityCriteria: {
      confirmed: [
        "Candidate must be a domicile of Maharashtra State.",
        "Must have passed SSC (10th) or equivalent from a recognized board.",
        "Enrolled in a recognized post-matric college or vocational diploma/degree course.",
        "Annual family income must not exceed the prescribed category ceiling (e.g., ₹2,50,000 for SC/ST or ₹8,00,000 for EBC)."
      ],
      userShouldVerify: [
        "Confirm whether your specific academic stream (regular vs. private/management quota) is eligible this academic year.",
        "Confirm minimum attendance requirement (typically 75%) with your college registrar."
      ]
    },
    documents: [
      { id: "doc-domicile", name: "Maharashtra Domicile Certificate", isMandatory: true, status: "Official Requirement", tip: "Issued by Tehsildar or available via Aaple Sarkar portal" },
      { id: "doc-income", name: "Current Year Family Income Certificate", isMandatory: true, status: "Official Requirement", tip: "Must be signed by an authorized Revenue Officer (Tehsildar)" },
      { id: "doc-marksheet", name: "10th / 12th / Previous Year Marksheets", isMandatory: true, status: "Official Requirement", tip: "Self-attested photocopies and originals for verification" },
      { id: "doc-college-receipt", name: "College Allotment Letter & Fee Receipt", isMandatory: true, status: "Official Requirement", tip: "Current academic session bonafide certificate from college" },
      { id: "doc-bank-aadhaar", name: "Aadhaar-Seeded Bank Passbook copy", isMandatory: true, status: "Official Requirement", tip: "Bank account must have NPCI Aadhaar mapper linked for DBT payments" },
      { id: "doc-ration", name: "Ration Card copy", isMandatory: false, status: "Confirm with college office", tip: "Sometimes required for family member validation" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Register on MahaDBT Portal",
        action: "Create a user profile on mahadbt.maharashtra.gov.in using your Aadhaar authentication.",
        notes: "Keep your registered mobile number active to receive OTP verification.",
        officialPortalLink: "https://mahadbt.maharashtra.gov.in"
      },
      {
        stepNumber: 2,
        title: "Fill Applicant Profile",
        action: "Enter personal details, address, caste category (if applicable), and upload your Domicile and Income certificates.",
        notes: "Ensure document file size is under the specified limit (typically 256 KB PDF/JPG).",
        officialPortalLink: "https://mahadbt.maharashtra.gov.in"
      },
      {
        stepNumber: 3,
        title: "Select Department & Scheme",
        action: "Navigate to 'Post Matric Scholarship' under Social Justice / Tribal / Higher Education department corresponding to your category.",
        notes: "Double check your college course code before submitting.",
        officialPortalLink: "https://mahadbt.maharashtra.gov.in"
      },
      {
        stepNumber: 4,
        title: "Submit & Hand Over Hard Copies to College",
        action: "Print the submitted application form and attach required photocopies. Submit to your college scholarship clerk.",
        notes: "Always collect a stamped acknowledgment slip from the college.",
        officialPortalLink: "https://mahadbt.maharashtra.gov.in"
      }
    ]
  },
  {
    id: "stand-up-india-women-scst",
    title: "Stand-Up India Scheme for Women & SC/ST Entrepreneurs",
    shortDescription: "Bank loans between ₹10 lakh and ₹1 crore to establish greenfield manufacturing, services, or trading enterprises.",
    category: "Women Empowerment",
    targetAudience: "Women & SC/ST Entrepreneurs (18+)",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "All India (Available through commercial bank branches in Pune)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-08-20",
    officialSourceUrl: "https://www.standupmitra.in",
    responsibleDepartment: "Department of Financial Services, Ministry of Finance, Govt of India",
    contactDetails: "National Toll Free: 1800-180-1111 / SIDBI Lead Office",
    benefitSummary: "Composite bank loan (term loan + working capital) covering up to 85% of project cost between ₹10,00,000 and ₹1,00,00,000.",
    matchRules: {
      minAge: 18,
      maxAge: 70,
      occupations: ["self-employed", "job-seeking", "employed"],
      states: ["Maharashtra", "Madhya Pradesh", "Delhi", "Karnataka"],
      categories: ["Women Empowerment", "Startup/Entrepreneurship"]
    },
    whyMatchedReason: "Matches interest in business launch / entrepreneurship for women or affirmative categories.",
    eligibilityCriteria: {
      confirmed: [
        "Applicant must be a Woman OR belong to SC / ST category.",
        "Age must be 18 years and above at the time of application.",
        "Project must be a 'Greenfield' enterprise (first-time venture in manufacturing, services, agri-allied, or trading).",
        "Borrower should not be in default to any bank or financial institution."
      ],
      userShouldVerify: [
        "In case of non-individual enterprises, at least 51% of shareholding and controlling stake must be held by a woman or SC/ST entrepreneur.",
        "Confirm margin money requirement (typically 15% which can be converged with eligible state subsidy schemes)."
      ]
    },
    documents: [
      { id: "doc-id-proof", name: "Voter ID / Passport / Driving License", isMandatory: true, status: "Official Requirement", tip: "Government issued photo identification" },
      { id: "doc-residence-proof", name: "Proof of Business & Residence Address", isMandatory: true, status: "Official Requirement", tip: "Electricity bill, registered rent agreement, or property tax receipt" },
      { id: "doc-category-cert", name: "Caste / Category Certificate (if SC/ST)", isMandatory: false, status: "Required for SC/ST applicants", tip: "Issued by competent revenue authority" },
      { id: "doc-dpr", name: "Detailed Project Report (DPR)", isMandatory: true, status: "Official Requirement", tip: "Outlining business model, machinery cost, working capital, and projected revenue" },
      { id: "doc-bank-statements", name: "Last 6 Months Personal Bank Statement", isMandatory: true, status: "Official Requirement", tip: "Shows financial discipline and track record" },
      { id: "doc-lease", name: "Lease or Rent Agreement for Business Premises", isMandatory: false, status: "Confirm with branch manager", tip: "Required once loan sanction stage is reached" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Prepare Your Project Report",
        action: "Draft a basic Detailed Project Report (DPR) detailing what product/service you will sell and expected setup expenses.",
        notes: "Campus mentors or local MSME DI centers can assist with project templates.",
        officialPortalLink: "https://www.standupmitra.in"
      },
      {
        stepNumber: 2,
        title: "Register on Stand-Up Mitra Portal",
        action: "Visit standupmitra.in and complete the online registration form as an entrepreneur.",
        notes: "You can choose 'Handholding Support' if you need guidance with technical or loan papers.",
        officialPortalLink: "https://www.standupmitra.in"
      },
      {
        stepNumber: 3,
        title: "Select Preferred Bank Branch",
        action: "Select a commercial bank branch located near your proposed business premises in your district.",
        notes: "Every commercial bank branch is mandated to facilitate at least two Stand-Up India loans.",
        officialPortalLink: "https://www.standupmitra.in"
      },
      {
        stepNumber: 4,
        title: "Branch Interaction & Sanction",
        action: "Meet the branch manager with your application reference ID, DPR, and KYC files.",
        notes: "The bank evaluates viability before issuing the sanction letter.",
        officialPortalLink: "https://www.standupmitra.in"
      }
    ]
  },
  {
    id: "pm-kvy-skill-certification",
    title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
    shortDescription: "Free industry-relevant skill training, digital literacy, and government certification with stipend assistance for youth.",
    category: "Skill & Employment",
    targetAudience: "Unemployed Youth, College Dropouts & Job Seekers (15–45)",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "National Scheme (Accredited Training Centers in Pune District)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-01",
    officialSourceUrl: "https://www.pmkvyofficial.org",
    responsibleDepartment: "Ministry of Skill Development and Entrepreneurship (MSDE) & NSDC",
    contactDetails: "Skill India Student Toll Free: 088000-55555",
    benefitSummary: "100% free technical skill training, National Skills Qualifications Framework (NSQF) certificate, soft skills & placement assistance.",
    matchRules: {
      minAge: 15,
      maxAge: 45,
      occupations: ["student", "job-seeking", "other"],
      states: ["Maharashtra", "Madhya Pradesh", "Delhi", "Karnataka"],
      categories: ["Skill & Employment", "Government Schemes"]
    },
    whyMatchedReason: "Matches your goal to gain certified vocational skills, technology training, or job readiness.",
    eligibilityCriteria: {
      confirmed: [
        "Indian national aged between 15 and 45 years.",
        "Unemployed youth, school/college dropout, or student seeking vocational certification.",
        "Must possess a valid Indian identification document."
      ],
      userShouldVerify: [
        "Each course sector (e.g. IT-ITeS, Healthcare, Electronics, Solar Technician) has specific minimum educational requirements (e.g. 8th, 10th, or 12th pass).",
        "Confirm seat availability with the local PMKVY training partner center."
      ]
    },
    documents: [
      { id: "doc-id", name: "Government Photo ID (Aadhaar or Voter ID)", isMandatory: true, status: "Official Requirement", tip: "For trainee registration on the Skill India Digital Hub" },
      { id: "doc-edu", name: "Highest Education Qualification Proof (Marksheet/Certificate)", isMandatory: true, status: "Official Requirement", tip: "8th, 10th, 12th or diploma certificate depending on chosen course" },
      { id: "doc-bank", name: "Personal Bank Account Passbook", isMandatory: true, status: "Official Requirement", tip: "For direct receipt of any assessment or travel reward stipends" },
      { id: "doc-photo", name: "Recent Passport Size Photographs (2 copies)", isMandatory: true, status: "Official Requirement", tip: "Required for physical center records and ID badge" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Explore Courses on Skill India Digital",
        action: "Visit skillindiadigital.gov.in and search for open courses in Pune district.",
        notes: "Courses range from 150 hours to 400 hours.",
        officialPortalLink: "https://www.skillindiadigital.gov.in"
      },
      {
        stepNumber: 2,
        title: "Visit Nearest Accredited Center",
        action: "Find the center address online and visit in person for career counseling and batch enrollment.",
        notes: "Do NOT pay any enrollment or training fee—PMKVY training is 100% sponsored by the government.",
        officialPortalLink: "https://www.pmkvyofficial.org"
      },
      {
        stepNumber: 3,
        title: "Complete Training & Attendance",
        action: "Attend the required classroom and lab sessions with biometric attendance.",
        notes: "A minimum of 70% attendance is mandatory to appear for certification assessment.",
        officialPortalLink: "https://www.pmkvyofficial.org"
      },
      {
        stepNumber: 4,
        title: "Assessment & NSQF Certification",
        action: "Appear for independent Sector Skill Council assessment and receive your digital credential.",
        notes: "Certified candidates are invited to Rozgar Melas (job fairs).",
        officialPortalLink: "https://www.pmkvyofficial.org"
      }
    ]
  },
  {
    id: "sample-ai-digital-literacy",
    title: "Sample scheme — replace with verified government information: National Digital AI Skills Pilot",
    shortDescription: "Illustrative demo program representing emerging artificial intelligence and cyber-security foundational training for community youth.",
    category: "AI & Digital",
    targetAudience: "Youth & Students (16–28)",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "Demo Pilot Entry (Field Verification Pending)"
    },
    verificationStatus: "Sample / Demo Record (Unverified)",
    isVerified: false,
    lastCheckedDate: "2026-10-01",
    officialSourceUrl: "https://www.digitalindia.gov.in",
    responsibleDepartment: "Sample Scheme Entry — Replace with Verified State/Central Department",
    contactDetails: "Contact your local pilot coordinator or Yuva Shakti campus desk",
    benefitSummary: "Demo entry: 40 hours of practical AI prompts, data ethics, and office automation certification.",
    matchRules: {
      minAge: 16,
      maxAge: 28,
      occupations: ["student", "job-seeking", "employed", "self-employed"],
      states: ["Maharashtra", "Madhya Pradesh", "Delhi", "Karnataka"],
      categories: ["AI & Digital"]
    },
    whyMatchedReason: "Matches selected interest in AI & Digital skills. (Note: This is an illustrative demo record for review).",
    eligibilityCriteria: {
      confirmed: [
        "Sample requirement: Basic English or Marathi comprehension.",
        "Sample requirement: Access to a smartphone or computer."
      ],
      userShouldVerify: [
        "Confirm whether your university or local community center has been designated as an active batch center.",
        "Verify examination schedule with your institutional mentor."
      ]
    },
    documents: [
      { id: "doc-sample-id", name: "Student ID card or Government Photo ID", isMandatory: true, status: "Sample guidance", tip: "Confirm with the official course portal before enrolling" },
      { id: "doc-sample-cert", name: "Basic Computer Literacy Certificate (Optional)", isMandatory: false, status: "Confirm with course trainer", tip: "May exempt you from Module 1 prerequisite" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Illustrative Step: Verify Batch Announcement",
        action: "Check official portal when published or ask your campus innovation cell.",
        notes: "Do not transfer money to unverified third-party recruiters.",
        officialPortalLink: "https://www.digitalindia.gov.in"
      },
      {
        stepNumber: 2,
        title: "Illustrative Step: Complete Online Diagnostic",
        action: "Complete a 15-minute foundational skills check.",
        notes: "Helps instructors place you in beginner or intermediate streams.",
        officialPortalLink: "https://www.digitalindia.gov.in"
      }
    ]
  },
  {
    id: "sample-sustainability-solar-rooftop",
    title: "Sample scheme — replace with verified government information: Community Rooftop Solar & Clean Energy Subsidy",
    shortDescription: "Illustrative demo program showing financial subsidies for installing grid-tied solar panels for domestic households and rural youth cooperatives.",
    category: "Sustainability",
    targetAudience: "Homeowners, Farmers & Rural Entrepreneurs",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "Demo Pilot Entry (Model Data)"
    },
    verificationStatus: "Sample / Demo Record (Unverified)",
    isVerified: false,
    lastCheckedDate: "2026-10-01",
    officialSourceUrl: "https://solarrooftop.gov.in",
    responsibleDepartment: "Sample Scheme Entry — Ministry of New and Renewable Energy (Model)",
    contactDetails: "Sample Helpdesk — Replace with verified state distribution utility contact",
    benefitSummary: "Demo entry: Capital subsidy of up to 40% for residential rooftop solar power systems.",
    matchRules: {
      minAge: 18,
      maxAge: 75,
      occupations: ["employed", "self-employed", "other"],
      states: ["Maharashtra", "Madhya Pradesh", "Delhi", "Karnataka"],
      categories: ["Sustainability", "Government Schemes"]
    },
    whyMatchedReason: "Matches selected focus on green energy, sustainability, or household utility reduction.",
    eligibilityCriteria: {
      confirmed: [
        "Sample requirement: Applicant must own suitable rooftop area with valid electricity connection.",
        "Sample requirement: Electricity bill payments must be up to date."
      ],
      userShouldVerify: [
        "Confirm technical feasibility report from local DISCOM (distribution company) engineer.",
        "Confirm registered empanelled vendor list in Pune district."
      ]
    },
    documents: [
      { id: "doc-sample-elec", name: "Latest Electricity Bill (Past 2 Months)", isMandatory: true, status: "Sample guidance", tip: "Consumer Number (CA number) must match the property address" },
      { id: "doc-sample-ownership", name: "Proof of Roof/Building Ownership", isMandatory: true, status: "Sample guidance", tip: "Index II, Municipal tax receipt, or registered sale deed" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Illustrative Step: Check DISCOM Feasibility",
        action: "Submit electricity connection consumer number on the national rooftop portal.",
        notes: "System evaluates transformer loading capacity in your area.",
        officialPortalLink: "https://solarrooftop.gov.in"
      },
      {
        stepNumber: 2,
        title: "Illustrative Step: Select Empanelled Vendor",
        action: "Choose an authorized installer from the district directory.",
        notes: "Only empanelled vendors qualify for the central DBT subsidy.",
        officialPortalLink: "https://solarrooftop.gov.in"
      }
    ]
  },
  {
    id: "startup-india-seed-fund",
    title: "Startup India Seed Fund Scheme (SISFS)",
    shortDescription: "Financial assistance to early-stage student & grassroots startups for proof of concept, prototype development, and market entry.",
    category: "Startup/Entrepreneurship",
    targetAudience: "Student Innovators & Early Founders",
    pilotLocation: {
      state: "Maharashtra",
      district: "Pune",
      scope: "National Scheme (Eligible Incubators located in Pune tech corridor)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-18",
    officialSourceUrl: "https://seedfund.startupindia.gov.in",
    responsibleDepartment: "Department for Promotion of Industry and Internal Trade (DPIIT), Govt of India",
    contactDetails: "Startup India Toll-Free: 1800-115-565",
    benefitSummary: "Grant of up to ₹20 Lakhs for validation of Proof of Concept/prototype, or debt/convertible debenture up to ₹50 Lakhs for commercialization.",
    matchRules: {
      minAge: 18,
      maxAge: 65,
      occupations: ["student", "self-employed", "job-seeking"],
      states: ["Maharashtra", "Madhya Pradesh", "Delhi", "Karnataka"],
      categories: ["Startup/Entrepreneurship"]
    },
    whyMatchedReason: "Matches interest in tech entrepreneurship, student incubation, or building a new product.",
    eligibilityCriteria: {
      confirmed: [
        "A startup recognized by DPIIT, incorporated not more than 2 years ago at the time of application.",
        "The startup must have a business idea to develop a product or service with a market fit, viable commercialization, and scope of scaling.",
        "Startup should not have received more than ₹10 lakh of monetary support under any other Central or State Government scheme."
      ],
      userShouldVerify: [
        "Indian promoters must hold at least 51% shareholding in the startup at the time of application.",
        "Check whether your regional college incubator (e.g. Pune University / COEP incubator) is an approved SISFS partner."
      ]
    },
    documents: [
      { id: "doc-dpiit", name: "DPIIT Certificate of Recognition", isMandatory: true, status: "Official Requirement", tip: "Issued online via Startup India portal without fees" },
      { id: "doc-pitch", name: "Pitch Deck & Prototype Video / Demo link", isMandatory: true, status: "Official Requirement", tip: "Explain problem statement, solution, target market, and milestone plan" },
      { id: "doc-pan-cin", name: "Company PAN and Certificate of Incorporation", isMandatory: true, status: "Official Requirement", tip: "For Private Limited or LLP entities" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "DPIIT Recognition",
        action: "Register entity on startupindia.gov.in and obtain DPIIT number.",
        notes: "Processing usually takes 2–4 working days.",
        officialPortalLink: "https://www.startupindia.gov.in"
      },
      {
        stepNumber: 2,
        title: "Apply on Seed Fund Portal",
        action: "Log in to seedfund.startupindia.gov.in and select up to 3 incubators in order of preference.",
        notes: "Select incubators with domain expertise in your sector.",
        officialPortalLink: "https://seedfund.startupindia.gov.in"
      },
      {
        stepNumber: 3,
        title: "Incubator Pitch Presentation",
        action: "Shortlisted candidates are invited by the Incubator Seed Management Committee (ISMC) to present.",
        notes: "Be prepared with unit economics and milestone timeline.",
        officialPortalLink: "https://seedfund.startupindia.gov.in"
      }
    ]
  },
  {
    id: "up-post-matric-scholarship-prayagraj",
    title: "UP Post-Matric Scholarship & Fee Reimbursement (Dashmottar)",
    shortDescription: "Complete tuition fee reimbursement and monthly stipend for college and university students studying in Prayagraj.",
    category: "Government Schemes",
    targetAudience: "College & University Students in Prayagraj (UG/PG/Diploma)",
    pilotLocation: {
      state: "Uttar Pradesh",
      district: "Prayagraj",
      scope: "Prayagraj District & Uttar Pradesh State"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-25",
    officialSourceUrl: "https://scholarship.up.gov.in",
    responsibleDepartment: "Social Welfare & Backward Classes Welfare Department, Govt of Uttar Pradesh",
    contactDetails: "UP CM Helpline: 1076 / Social Welfare Prayagraj: 0532-2641215",
    benefitSummary: "100% non-refundable fee reimbursement (tuition + exam fees) plus monthly maintenance allowance credited directly through Aadhaar DBT.",
    matchRules: {
      minAge: 16,
      maxAge: 35,
      occupations: ["student"],
      maxFamilyIncome: 250000,
      states: ["Uttar Pradesh"],
      categories: ["Government Schemes"]
    },
    whyMatchedReason: "Matches student status in Prayagraj, Uttar Pradesh with household income qualifying for UP Dashmottar fee concession.",
    eligibilityCriteria: {
      confirmed: [
        "Candidate must be a bonafide resident/domicile of Uttar Pradesh.",
        "Must be enrolled in a recognized university or college in Prayagraj (e.g. University of Allahabad, MNNIT, Rajju Bhaiya University, or affiliated institutes).",
        "Family annual income must not exceed ₹2,50,000 (for SC/ST) or ₹2,00,000 (for General, OBC, and Minority applicants).",
        "Must have valid DigiLocker account linked with Aadhaar."
      ],
      userShouldVerify: [
        "Confirm whether your admission was through university entrance or management quota with your college scholarship desk.",
        "Ensure bank account is seeded on NPCI mapper for Direct Benefit Transfer."
      ]
    },
    documents: [
      { id: "doc-up-domicile", name: "UP Domicile Certificate (Niwas Praman Patra)", isMandatory: true, status: "Official Requirement", tip: "Issued by Tehsildar or via eSathi UP portal" },
      { id: "doc-up-income", name: "Current Year Income Certificate (Aay Praman Patra)", isMandatory: true, status: "Official Requirement", tip: "Must be verified on UP Revenue edistrict database" },
      { id: "doc-up-caste", name: "Caste Certificate (if OBC/SC/ST)", isMandatory: false, status: "Official Requirement for quota", tip: "Required for reservation category fee reimbursement" },
      { id: "doc-up-fee-receipt", name: "Current Academic Session College Fee Receipt", isMandatory: true, status: "Official Requirement", tip: "Showing non-refundable tuition component" },
      { id: "doc-up-bank", name: "Aadhaar-Seeded Bank Account Passbook", isMandatory: true, status: "Official Requirement", tip: "Account must be active with NPCI mapper" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "DigiLocker Student Registration",
        action: "Visit scholarship.up.gov.in and complete initial registration using your DigiLocker Aadhaar e-KYC.",
        notes: "Keep your Aadhaar-registered mobile active for instant OTP verification.",
        officialPortalLink: "https://scholarship.up.gov.in"
      },
      {
        stepNumber: 2,
        title: "Fill Educational & Fee Details",
        action: "Enter your high school roll number, course registration ID, and annual fee amount.",
        notes: "Take care to input the exact non-refundable fee amount specified on your college receipt.",
        officialPortalLink: "https://scholarship.up.gov.in"
      },
      {
        stepNumber: 3,
        title: "Lock Final Application & Print",
        action: "Review the draft carefully, apply corrections within 3 days, and lock the final application.",
        notes: "Once locked, print two sets of the application summary.",
        officialPortalLink: "https://scholarship.up.gov.in"
      },
      {
        stepNumber: 4,
        title: "Submit Hard Copies to College Desk in Prayagraj",
        action: "Submit hard copy with attested certificates to your college scholarship officer.",
        notes: "Collect a stamped acknowledgment receipt for tracking.",
        officialPortalLink: "https://scholarship.up.gov.in"
      }
    ]
  },
  {
    id: "up-mukhyamantri-abhyudaya-prayagraj",
    title: "Mukhyamantri Abhyudaya Yojana (Free Competitive Coaching — Prayagraj Center)",
    shortDescription: "Free offline coaching, guidance by civil servants, and tablet assistance for UPSC, UPPSC, JEE, and NEET aspirants in Prayagraj.",
    category: "Skill & Employment",
    targetAudience: "Competitive Exam Aspirants in Prayagraj (UPSC, UPPSC, JEE, NEET, NDA)",
    pilotLocation: {
      state: "Uttar Pradesh",
      district: "Prayagraj",
      scope: "Prayagraj Divisional Center (Allahabad University & Vikas Bhawan)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-15",
    officialSourceUrl: "https://abhyuday.up.gov.in",
    responsibleDepartment: "Social Welfare Department, Government of Uttar Pradesh",
    contactDetails: "District Social Welfare Office, Vikas Bhawan, Prayagraj / Toll Free: 1800-180-5131",
    benefitSummary: "100% free physical classroom coaching by serving IAS/IPS/PCS officers and subject faculty at Prayagraj centers, plus free digital tablet and library access for top merit qualifiers.",
    matchRules: {
      minAge: 17,
      maxAge: 35,
      occupations: ["student", "job-seeking"],
      states: ["Uttar Pradesh"],
      categories: ["Skill & Employment", "Government Schemes"]
    },
    whyMatchedReason: "Matches your profile as a student or job seeker in Prayagraj preparing for higher education or competitive exams.",
    eligibilityCriteria: {
      confirmed: [
        "Candidate must be a permanent resident of Uttar Pradesh.",
        "Must be preparing for recognized competitive examinations: UPSC Civil Services, UPPSC, JEE Mains/Advanced, NEET-UG, or NDA/CDS.",
        "Selection is conducted via an online state eligibility screening examination."
      ],
      userShouldVerify: [
        "Confirm whether your batch is allotted to physical offline lectures at Prayagraj center or live interactive virtual sessions.",
        "Check interview guidance schedule if you have cleared prelims/mains."
      ]
    },
    documents: [
      { id: "doc-abh-id", name: "Government Photo ID (Aadhaar or Voter ID)", isMandatory: true, status: "Official Requirement", tip: "For student registration on abhyuday.up.gov.in" },
      { id: "doc-abh-edu", name: "Graduation / Intermediate Marksheet", isMandatory: true, status: "Official Requirement", tip: "12th marksheet for JEE/NEET; Degree for UPSC/UPPSC" },
      { id: "doc-abh-domicile", name: "Uttar Pradesh Domicile Certificate", isMandatory: true, status: "Official Requirement", tip: "Proves UP residency" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Register on Abhyudaya Portal",
        action: "Visit abhyuday.up.gov.in and click 'Register for Examination'.",
        notes: "Select 'Prayagraj Division' as your preferred examination center.",
        officialPortalLink: "https://abhyuday.up.gov.in"
      },
      {
        stepNumber: 2,
        title: "Appear for Online Screening Test",
        action: "Take the 60-minute objective screening test in your chosen subject stream.",
        notes: "Top scorers are invited for physical classroom enrollment.",
        officialPortalLink: "https://abhyuday.up.gov.in"
      },
      {
        stepNumber: 3,
        title: "Join Classes at Prayagraj Center",
        action: "Attend scheduled lectures at the designated Prayagraj center (Vikas Bhawan / Allahabad University).",
        notes: "Lectures include regular mentorship sessions by district administrative officers.",
        officialPortalLink: "https://abhyuday.up.gov.in"
      }
    ]
  },
  {
    id: "up-odop-prayagraj-moonj-craft",
    title: "One District One Product (ODOP) Margin Money Scheme — Prayagraj Moonj Craft & Food Processing",
    shortDescription: "Subsidies of up to 25% (up to ₹6.25 lakh) and bank loan facilitation for Moonj artisans, youth innovators, and agro-processors in Prayagraj.",
    category: "Startup/Entrepreneurship",
    targetAudience: "Artisans, Youth Entrepreneurs & Self-Help Groups in Prayagraj",
    pilotLocation: {
      state: "Uttar Pradesh",
      district: "Prayagraj",
      scope: "Prayagraj District Designated ODOP Hub"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-08-30",
    officialSourceUrl: "https://msme.up.gov.in",
    responsibleDepartment: "Department of MSME and Export Promotion, Govt of Uttar Pradesh",
    contactDetails: "District Industries Center (DIC) Prayagraj, Teliyarganj: 0532-2545120",
    benefitSummary: "Margin money financial grant of up to 25% of total project cost (up to ₹6.25 lakh subsidy for projects up to ₹25 lakh) for establishing Moonj handicrafts, Allahabad Surkha Guava processing, or micro-manufacturing in Prayagraj.",
    matchRules: {
      minAge: 18,
      maxAge: 65,
      occupations: ["self-employed", "job-seeking", "employed"],
      states: ["Uttar Pradesh"],
      categories: ["Startup/Entrepreneurship", "Women Empowerment"]
    },
    whyMatchedReason: "Matches your business or enterprise interest in Prayagraj district under the official ODOP development program.",
    eligibilityCriteria: {
      confirmed: [
        "Applicant must be at least 18 years of age and a resident of Prayagraj district.",
        "Project must focus on Prayagraj's designated ODOP trade (Moonj products, handicrafts, or Surkha guava/food processing) or allied manufacturing.",
        "Applicant should not be a defaulter with any financial institution or bank."
      ],
      userShouldVerify: [
        "For projects costing over ₹10 Lakhs, applicant should have passed minimum 8th class.",
        "Check whether your proposed unit qualifies for additional 10% special category subsidy for women or SC/ST entrepreneurs."
      ]
    },
    documents: [
      { id: "doc-odop-residence", name: "Prayagraj Residence Proof", isMandatory: true, status: "Official Requirement", tip: "Voter ID, Domicile certificate, or Aadhaar" },
      { id: "doc-odop-dpr", name: "Detailed Project Report (DPR)", isMandatory: true, status: "Official Requirement", tip: "Outlining equipment costs, raw moonj/fruit procurement, and projected cash flows" },
      { id: "doc-odop-edu", name: "Educational Marksheet", isMandatory: false, status: "Mandatory for projects > ₹10 Lakh", tip: "8th or 10th pass certificate" },
      { id: "doc-odop-pan", name: "PAN Card and Bank Account", isMandatory: true, status: "Official Requirement", tip: "For loan disbursement and DBT margin money credit" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Online Application on MSME UP Portal",
        action: "Apply on msme.up.gov.in or diupmsme.upsdc.gov.in under ODOP Margin Money Scheme.",
        notes: "Select District Industries Center (DIC) Prayagraj as your approving agency.",
        officialPortalLink: "https://msme.up.gov.in"
      },
      {
        stepNumber: 2,
        title: "District Task Force Committee Interview",
        action: "Present your project proposal before the Prayagraj District Task Force Committee headed by the District Magistrate/CDO.",
        notes: "Committees meet monthly at Vikas Bhawan Prayagraj.",
        officialPortalLink: "https://msme.up.gov.in"
      },
      {
        stepNumber: 3,
        title: "Bank Sanction & Margin Money Release",
        action: "Upon approval, the file is transmitted to your chosen commercial bank branch in Prayagraj for loan disbursement and margin money lock-in.",
        notes: "Subsidy is adjusted after successful continuous operation for 3 years.",
        officialPortalLink: "https://msme.up.gov.in"
      }
    ]
  },
  {
    id: "up-digishakti-smartphones-prayagraj",
    title: "Swami Vivekananda Yuva Sashaktikaran Yojana (DigiShakti Free Smartphone/Tablet)",
    shortDescription: "Free digital devices (tablets and smartphones) provided to higher education and technical students enrolled in Prayagraj colleges.",
    category: "AI & Digital",
    targetAudience: "Final & Pre-Final Year College Students in Prayagraj (BA, BSc, BTech, MA, ITI, Polytechnic)",
    pilotLocation: {
      state: "Uttar Pradesh",
      district: "Prayagraj",
      scope: "Statewide (All Degree & Technical Colleges in Prayagraj)"
    },
    verificationStatus: "Verified Government Record",
    isVerified: true,
    lastCheckedDate: "2026-09-05",
    officialSourceUrl: "https://digishakti.up.gov.in",
    responsibleDepartment: "Department of IT and Electronics, Government of Uttar Pradesh",
    contactDetails: "Contact your College DigiShakti Nodal Officer / Prayagraj University Registrar",
    benefitSummary: "100% free Android tablet or smartphone preloaded with government educational content, employment alerts, and career skilling apps.",
    matchRules: {
      minAge: 18,
      maxAge: 30,
      occupations: ["student"],
      states: ["Uttar Pradesh"],
      categories: ["AI & Digital", "Government Schemes"]
    },
    whyMatchedReason: "Matches your student enrollment in a recognized higher education or technical institution in Prayagraj, Uttar Pradesh.",
    eligibilityCriteria: {
      confirmed: [
        "Candidate must be a bonafide student enrolled in an accredited university, degree college, polytechnic, or ITI in Uttar Pradesh.",
        "Must be in final or intermediate semester/year of study.",
        "Candidate must not have received a smartphone or tablet under this scheme previously."
      ],
      userShouldVerify: [
        "Students do NOT need to register individually on the portal; registration is done directly by your college nodal officer.",
        "Confirm with your department head whether your student roll data has been uploaded to the DigiShakti portal."
      ]
    },
    documents: [
      { id: "doc-digi-id", name: "Valid College Student ID Card", isMandatory: true, status: "Official Requirement", tip: "Shows active enrollment for current academic session" },
      { id: "doc-digi-aadhaar", name: "Aadhaar Card", isMandatory: true, status: "Official Requirement", tip: "Used for biometric verification at device distribution" },
      { id: "doc-digi-fee", name: "Current Session Fee Receipt", isMandatory: true, status: "Official Requirement", tip: "Proof of active regular student status" }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: "Institutional Data Verification",
        action: "Verify that your college scholarship/nodal officer has uploaded your enrollment details on digishakti.up.gov.in.",
        notes: "No individual fee or online portal registration is required from students.",
        officialPortalLink: "https://digishakti.up.gov.in"
      },
      {
        stepNumber: 2,
        title: "Track Distribution Status",
        action: "Check SMS updates received on your Aadhaar-registered mobile number regarding the distribution camp date at your campus.",
        notes: "Do NOT pay any courier or processing charge to anyone.",
        officialPortalLink: "https://digishakti.up.gov.in"
      },
      {
        stepNumber: 3,
        title: "Device Handover & Acknowledgment",
        action: "Receive your device at the official college distribution event upon presenting your original Aadhaar and College ID card.",
        notes: "Sign the institutional acknowledgment register.",
        officialPortalLink: "https://digishakti.up.gov.in"
      }
    ]
  }
];

export const JARGON_DICTIONARY = [
  {
    term: "DBT (Direct Benefit Transfer)",
    meaning: "A government mechanism where subsidies, scholarships, or benefits are transferred directly into your bank account, removing middlemen."
  },
  {
    term: "Aadhaar Seeding / NPCI Mapper",
    meaning: "Linking your bank account to the National Payments Corporation of India (NPCI) database so that government funds reach you without needing bank branch IFSC codes."
  },
  {
    term: "Domicile Certificate",
    meaning: "An official revenue document proving that you or your parents have resided in a specific state (such as Maharashtra) for the mandatory duration (usually 15 years)."
  },
  {
    term: "Bonafide Certificate",
    meaning: "A document signed by your school principal or college dean certifying that you are a genuine, enrolled student during the current academic term."
  },
  {
    term: "Greenfield Enterprise",
    meaning: "A completely new business or factory setup from scratch, as opposed to expanding an already established business."
  },
  {
    term: "DPIIT Recognition",
    meaning: "Official certification from the Department for Promotion of Industry and Internal Trade confirming your venture as a qualified startup."
  }
];
