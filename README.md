# 🎓 ScholarshipHub — Pakistan & Global Scholarship Portal

A clean, minimalist, high-performance, responsive, and user-friendly web portal designed to post and aggregate daily scholarship opportunities from every corner of Pakistan and premier institutions worldwide.

---

## 🌟 Key Features

### 1. Complete Category Coverage
All required scholarship classifications with instant one-click filter pills:
- 🇵🇰 **Pakistan Scholarships**: HEC Indigenous Fellowship, PEEF Master's & School/College Quotas, LUMS National Outreach Programme (NOP), FBISE Merit Scholarships, NUST & AKU Need-Based Grants, Balochistan/FATA schemes.
- 🌍 **International Scholarships**: Fulbright USA, Chevening UK, DAAD Germany, Turkiye Burslari, Stipendium Hungaricum, MEXT Japan, CSC China, Erasmus Mundus EU, Australia Awards, Gates Cambridge UK, SINGA Singapore.
- 🎓 **Undergraduate Scholarships**: 4-year & 5-year BS/MBBS merit and need-based financial awards.
- 📚 **Master's Scholarships**: MS, MPhil, and taught postgraduate fellowships.
- 🏆 **PhD Scholarships**: Doctoral research grants, international fellowships, and living stipends.
- 💯 **Fully Funded Scholarships**: 100% tuition coverage, monthly living stipend, airfare, health insurance, and research allowance.
- 🏛️ **Government Scholarships**: Federal and provincial initiatives (HEC, FCDO UK, US State Dept, YTB Turkey, DAAD Germany).
- 🎒 **School & College Students**: Specific awards for Matric (SSC) and Intermediate (HSSC/FSc/FA) students.

### 2. Rich Scholarship Dossier on Every Card
Each post displays:
- **Title** of the program
- **Country** with flag badge
- **Institution Name** (University, Government Body, Foundation)
- **Funding Type** (Fully Funded, Partially Funded, Tuition Waiver)
- **Key Eligibility Criteria** (distilled bulleted highlights)
- **Application Deadline** (with dynamic days-remaining countdown & urgency alerts)
- **Official Application Link** (direct link with external icon)
- **Save / Bookmark Button** (persisted in browser `localStorage`)
- **"View Details" Modal** with exhaustive coverage breakdown, eligibility criteria, and required documents checklist.

### 3. Real-Time Search & Advanced Multi-Filter
- **Real-Time Live Search**: Search across titles, universities, country names, degree levels, and eligibility keywords with debouncing and a quick-clear button.
- **Horizontal Scrolling Category Pills**: Designed for desktop and fluid mobile swipe navigation.
- **Advanced Select Filters**:
  - Filter by Education Level (School, College, Undergraduate, Master's, PhD)
  - Filter by Country (Pakistan, US, UK, Germany, Turkey, Hungary, Japan, Australia, China, etc.)
  - Filter by Funding Status (Fully Funded, Partially Funded)
- **Smart Sorting**: Newest added, Deadline (ending soonest vs. furthest), and Title A–Z.
- **Saved Scholarships Drawer**: Click "Saved" in the header to review bookmarked opportunities anytime.

### 4. Daily Publishing & Admin Integration
- **"+ Post Scholarship" Modal**: An integrated admin form allowing you to post newly announced scholarships in seconds without touching code.
- Automatically saves new posts to `localStorage` and prepends them to the live feed immediately.
- **"📥 Export Database (JSON)" Button**: In the footer, easily download the full updated database with a single click to commit or back up your daily posts.
- **"🔄 Reset to Defaults"**: Option to reset to the original catalog.

### 5. News Section
- Dedicated **News & Bulletins** section kept cleanly formatted with a minimalist inactive placeholder as requested, ready for future official circulars and test announcements.

### 6. Design & Performance
- Built with semantic **HTML5, CSS3 variables, and vanilla ES6 JavaScript** (Zero external runtime dependencies, 0ms build step, instant load time).
- Mobile-first responsive layout (works on smartphones, tablets, laptops, and ultra-wide displays).
- Includes **Dark Mode / Light Mode** toggle with auto-preference saving.
- Smooth transitions, accessible contrast ratios, and modern typography (Plus Jakarta Sans).

---

## 📁 Files & Folder Structure

```
scholarship web/
├── index.html                 # Semantic HTML structure & accessible modals
├── css/
│   ├── style.css              # Core typography, CSS variables, cards, modals & animations
│   └── responsive.css         # Responsive breakpoints for tablets and smartphones
├── js/
│   ├── data.js                # Initial database (20+ verified scholarships) & storage helpers
│   ├── admin.js               # Post Scholarship modal, form parser, and JSON export tool
│   └── app.js                 # Search, multi-filtering, bookmarking, and modal rendering
└── README.md                  # Comprehensive setup & user documentation
```

---

## 🚀 How to Run the Website

### Option 1: Double-Click (Simplest)
Open the folder `scholarship web` and double-click `index.html` to open it directly in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox, Opera).

### Option 2: Run with a Local Web Server
If you have Python installed, open terminal or PowerShell in this folder and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your browser.

If you have Node.js installed, you can run:
```bash
npx serve .
```

---

## 📝 How to Add Daily Scholarships

Whenever a new scholarship is announced:
1. Click the **"+ Post Scholarship"** button located in the top bar or header.
2. Fill out the fields:
   - **Title** (e.g. *HEC Overseas Scholarships Phase-IV*)
   - **Institution** (e.g. *Higher Education Commission*)
   - **Country** (e.g. *Pakistan*)
   - **Education Level** (*Undergraduate, Master's, PhD, College, or School*)
   - **Funding Type** (*Fully Funded, Partially Funded, etc.*)
   - **Application Deadline** (Select date from calendar)
   - **Official Application Link** (e.g. `https://hec.gov.pk/...`)
   - **Category Tags** (Check all applicable categories)
   - **Summary & Eligibility Criteria** (Enter points, one per line)
   - **Benefits & Documents Checklist**
3. Click **"Publish Scholarship Now"**.
4. The scholarship will immediately appear at the top of your feed with active badges, search indexing, and detail modal support!
5. To permanently save newly posted scholarships to your code repository, click **"📥 Export Database (JSON)"** in the footer.

## 🤖 Automated AI Research & Publishing Pipeline (GitHub Actions)

An autonomous daily pipeline powered by **Google Gemini AI** and **GitHub Actions** that automatically researches, strictly verifies, and publishes genuine scholarships without human intervention.

### How It Operates:
1. **Daily Cron Trigger**: Runs automatically every day at `06:00 UTC` (11:00 AM Pakistan Standard Time).
2. **On-Demand Manual Trigger**: You can trigger the pipeline anytime by navigating to the [GitHub Actions Tab](https://github.com/yarg516-sys/scholarship-hub/actions) -> Select **Daily AI Scholarship Research & Publishing Pipeline** -> Click **Run workflow**.
3. **AI Deep Research**: Analyzes official university circulars, provincial and federal portals (HEC, PEEF, SHEC, LUMS, NUST, AKU, FBISE) and global fellowships (Fulbright, Chevening, DAAD, MEXT, CSC, Turkiye Burslari).
4. **Strict Multi-Point Verification**:
   - **Domain Trustworthiness**: Rejects third-party blogs, ad aggregators, and spam links. Only accepts official academic and government domains (`.edu.pk`, `.gov.pk`, `.edu`, `.gov`, `.ac.uk`, `.org`).
   - **Live HTTP Check**: Performs automated network health checks to ensure the official application portal is live and reachable.
   - **Deadline Validation**: Automatically discards expired scholarships (`deadline >= today`).
   - **Duplicate Prevention**: Cross-references program IDs, titles, and application URLs against the existing catalog to avoid duplicate posts.
5. **Auto-Deploy to GitHub Pages**: When new verified scholarships are found, the pipeline commits the updated `js/data.js` and `index.html` cache-buster directly to `main`, automatically triggering GitHub Pages deployment!

### Storing Your Gemini API Key in GitHub Secrets:
For enhanced security:
1. Open your repository: [https://github.com/yarg516-sys/scholarship-hub/settings/secrets/actions](https://github.com/yarg516-sys/scholarship-hub/settings/secrets/actions)
2. Click **New repository secret**.
3. Name: `GEMINI_API_KEY`
4. Value: Paste your Gemini API key.
5. Click **Add secret**.

### Standard Pipeline JSON Schema:
```json
{
  "id": "hec-phd-fellowship-2026",
  "title": "HEC Indigenous PhD Fellowship",
  "institution": "Higher Education Commission (HEC)",
  "country": "Pakistan",
  "countryCode": "PK",
  "level": "PhD",
  "fundingType": "Fully Funded",
  "isGovernment": true,
  "isInternational": false,
  "categories": ["pakistan", "phd", "fully-funded", "government"],
  "educationLevels": ["PhD"],
  "deadline": "2026-10-15",
  "applyLink": "https://hec.gov.pk/",
  "featured": true,
  "summary": "Full tuition waiver and monthly living stipend for PhD scholars.",
  "eligibility": [
    "Pakistani / AJK national with 16 years of education.",
    "Minimum 3.0 out of 4.0 CGPA."
  ],
  "coverage": [
    "100% full university tuition fee.",
    "Monthly stipend PKR 45,000."
  ],
  "documents": [
    "Attested degrees and academic transcripts.",
    "HEC HAT scorecard."
  ]
}
```

Whenever your pipeline generates or fetches new items, it can write directly to `INITIAL_SCHOLARSHIPS` in `js/data.js`, or call `saveCustomScholarship(item)` in JavaScript, or store items in `localStorage` under `scholarship_hub_items_v2`.

---

## 🌐 Free Deployment Options

You can host this website online for free in under 2 minutes:
- **GitHub Pages**: Create a GitHub repo, upload these files, and enable GitHub Pages in Settings.
- **Netlify**: Drag and drop the `scholarship web` folder into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` in this folder or link your GitHub repository.
