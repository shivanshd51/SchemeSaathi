# SchemeSaathi 🇮🇳
> **“Find the right benefit. Finish the application.”**  
> A Student Innovation Project for **YUVA SHAKTI THINK TANK**.

SchemeSaathi helps students, families, first-time applicants, and local support workers discover government schemes they may be eligible for, understand prerequisites, generate personalized document checklists, and finish their applications without predatory cyber-cafe middlemen.

---

## 🌟 Key Features

- **Apple Clarity & Blinkit Vitality**: Warm cream background, deep ink typography, vivid leaf green, rounded card architecture, and accessible UI.
- **Universal Location Engine**: Select from all 36 Indian States and Union Territories or type any state and district.
- **Automated Live Portal Discovery**: Automatically queries official state government portals in the background for real, verified circulars.
- **Strict State-Level Isolation**: State-specific schemes from other states are excluded; only relevant state programs and All-India Central schemes are surfaced.
- **Eligibility Finder Wizard**: 4-step progressive questionnaire with zero tracking (no Aadhaar, PAN, or passwords requested).
- **Personalized Document Checklist**: Interactive completion tracking with clean `@media print` layout for one-click PDF printing.
- **Application Blueprint & Jargon Buster**: 4-phase framework and glossary of bureaucratic terms (*DBT*, *NPCI Seeding*, *Domicile*, *Bonafide*).
- **Campus Volunteer Support**: Direct inquiry connection to Yuva Shakti student peer desks.
- **Measurable Impact Dashboard**: Dual-mode tracking displaying live pilot baseline and illustrative field trial benchmarks.
- **Admin Data Inspector**: Full schema documentation, JSON viewer, schema download, and scheme entry management.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/shivanshd51/SchemeSaathi.git
cd SchemeSaathi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and add your Google Gemini API key:
```bash
cp .env.example .env
```
In `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🛡️ Core Trust & Integrity Principles

1. **Informational Guidance Only**: SchemeSaathi never guarantees eligibility, approval, or disbursement. The respective government departments hold sole statutory authority.
2. **Verified Sources**: All schemes link directly to verified official government portals (`.gov.in` / `.nic.in`) with explicit "Checked on [Date]" badges.
3. **Privacy by Design**: No personal identifiers or quiz answers are transmitted or stored remotely.

---

## 📜 License
Released under the MIT License for public welfare and student innovation. Developed by students of **Yuva Shakti Think Tank**.
