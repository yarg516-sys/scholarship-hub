#!/usr/bin/env python3
"""
AI-Powered Scholarship Research & Verification Pipeline
-------------------------------------------------------
Researches new scholarships from Pakistan and worldwide using Google Gemini API.
Verifies authenticity, checks official university/government domains, avoids duplicates,
validates deadlines, and publishes verified opportunities directly to the website.
"""

import os
import sys
import json
import re
import datetime
import urllib.request
import urllib.error

# API & Target Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "js", "data.js")
INDEX_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "index.html")

MODELS_TO_TRY = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest"]

# Disallowed domains (blogs, spam aggregators, unofficial third-party sites)
UNOFFICIAL_DOMAINS = [
    "facebook.com", "instagram.com", "twitter.com", "x.com", "linkedin.com",
    "scholarships365.info", "scholarshipscorner.website", "opportunitydesk.org",
    "youthop.com", "opportunitiescircle.com", "scholarshipsads.com", "blogspot.com",
    "wordpress.com", "pinterest.com", "t.me", "telegram.org", "whatsapp.com"
]

def log(msg):
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg}")

def check_url_live(url, timeout=7):
    """Verify that the official URL is reachable and returns an acceptable HTTP status."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as response:
            status = response.getcode()
            return status in [200, 301, 302, 307, 308, 403] # Some gov sites block scraping with 403 but domain is real
    except urllib.error.HTTPError as e:
        # 403 or 401 usually means the institutional firewall blocked the bot, but domain is live
        if e.code in [401, 403, 301, 302]:
            return True
        log(f"URL check failed for {url}: HTTP {e.code}")
        return False
    except Exception as e:
        log(f"URL connection error for {url}: {e}")
        return False

def is_domain_trusted(url):
    """Check if the URL belongs to an official institution, government or legitimate university."""
    url_lower = url.lower()
    
    # Exclude known third-party scraper blogs
    for bad in UNOFFICIAL_DOMAINS:
        if bad in url_lower:
            return False
            
    # Check for recognized academic/government domains or protocols
    trusted_indicators = [
        ".gov.pk", ".edu.pk", ".gov", ".edu", ".ac.uk", ".org",
        ".edu.au", ".edu.cn", ".ac.jp", ".ac.kr", ".edu.tr", ".de",
        ".edu.sg", ".europa.eu", "hec.gov.pk", "peef.org.pk", "usefp.org"
    ]
    return any(ind in url_lower for ind in trusted_indicators)

def extract_current_scholarships():
    """Extract existing scholarships list from js/data.js."""
    if not os.path.exists(DATA_FILE_PATH):
        return []
    with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"const INITIAL_SCHOLARSHIPS = (\[[\s\S]*?\]);", content)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception:
            # Fallback to loose extraction or empty
            pass
    return []

def call_gemini(prompt):
    """Call Google Gemini API with fallback models."""
    if not GEMINI_API_KEY:
        log("ERROR: No GEMINI_API_KEY provided!")
        return None

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 3500
        }
    }

    for model in MODELS_TO_TRY:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
        try:
            req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=30) as res:
                data = json.loads(res.read().decode("utf-8"))
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text
        except Exception as e:
            log(f"Warning: Model {model} request error: {e}. Trying next model...")

    return None

def research_scholarships():
    """Prompt AI to research verified scholarships for Pakistan and International categories."""
    today = datetime.date.today().isoformat()
    current_year = datetime.date.today().year

    prompt = f"""
You are an expert academic scholarship verification officer.
Today is {today}.
Research and return a verified list of active, official scholarship opportunities announced by universities, governments, and reputable international institutions.

Target Categories to cover:
1. Pakistan Scholarships (HEC, Provincial Governments like Punjab PEEF, Sindh, Balochistan, KP, top universities like LUMS, NUST, AKU, FAST, FBISE, Cadet colleges).
2. International Scholarships (USA Fulbright, UK Chevening, Germany DAAD, Turkiye Burslari, Japan MEXT, Hungary Stipendium, China CSC, Australia Awards, Erasmus Mundus, Singapore SINGA, Gates Cambridge).
3. Degrees: School (SSC), College (HSSC/Inter), Undergraduate (BS/MBBS), Master's (MS/MPhil), PhD.

STRICT AUTHENTICITY & ACCURACY RULES:
- ONLY include genuine, verified scholarships currently active for {current_year} or {current_year + 1}.
- NEVER return expired scholarships. The deadline MUST be after {today}.
- ONLY official application links directly from the university or government portal (e.g. .edu.pk, .gov.pk, .edu, .gov, .ac.uk, .org).
- NO blog links, NO ad scrapers, NO unofficial websites (e.g. NO scholarships365, NO opportunitydesk, NO facebook links).
- Each scholarship MUST have complete eligibility criteria and coverage benefits.

Return a valid JSON array of objects conforming EXACTLY to this schema:
[
  {{
    "id": "unique-slug-identifier",
    "title": "Full Official Scholarship Title",
    "institution": "Official Institution / University / Ministry Name",
    "country": "Country Name",
    "countryCode": "2-letter ISO country code (e.g. PK, US, GB, DE, TR, HU, JP, CN, AU, SG)",
    "level": "One of: School, College, Undergraduate, Master's, PhD",
    "fundingType": "One of: Fully Funded, Partially Funded, Tuition Waiver",
    "isGovernment": true or false,
    "isInternational": true or false,
    "categories": ["array of matching tags: pakistan or international, undergraduate or masters or phd, fully-funded, government"],
    "educationLevels": ["One or more: School, College, Undergraduate, Master's, PhD"],
    "deadline": "YYYY-MM-DD",
    "applyLink": "Direct official portal URL (https://...)",
    "featured": true or false,
    "summary": "1-2 sentences summarizing the grant.",
    "eligibility": ["Criteria bullet 1", "Criteria bullet 2", "Criteria bullet 3"],
    "coverage": ["Benefit 1", "Benefit 2"],
    "documents": ["Required document 1", "Required document 2"]
  }}
]

Respond ONLY with the raw JSON array. Do not include markdown codeblocks or conversational text.
"""

    log("Researching scholarships with Gemini AI...")
    raw_response = call_gemini(prompt)
    if not raw_response:
        return []

    # Clean response string of markdown fences if any
    cleaned = raw_response.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    cleaned = cleaned.strip()

    try:
        candidates = json.loads(cleaned)
        if isinstance(candidates, list):
            return candidates
    except Exception as e:
        log(f"Failed to parse JSON response: {e}")
        # Try finding json array inside
        match = re.search(r"(\[[\s\S]*\])", cleaned)
        if match:
            try:
                return json.loads(match.group(1))
            except Exception:
                pass

    return []

def verify_and_filter_candidates(candidates, existing_scholarships):
    """Strictly verify candidates against official rules, dead links, duplicates, and expired dates."""
    today = datetime.date.today().isoformat()
    existing_ids = {s.get("id") for s in existing_scholarships if "id" in s}
    existing_titles = {s.get("title", "").strip().lower() for s in existing_scholarships}
    existing_urls = {s.get("applyLink", "").strip().rstrip("/") for s in existing_scholarships}

    verified_list = []

    log(f"Evaluating {len(candidates)} candidate scholarships from AI research...")

    for item in candidates:
        title = item.get("title", "").strip()
        apply_url = item.get("applyLink", "").strip()
        deadline = item.get("deadline", "")
        item_id = item.get("id", "").strip()

        # 1. Basic field validation
        if not title or not apply_url or not item.get("institution") or not deadline:
            log(f"❌ Rejected [{title}]: Incomplete required fields.")
            continue

        # 2. Duplicate check
        if item_id in existing_ids or title.lower() in existing_titles or apply_url.rstrip("/") in existing_urls:
            log(f"ℹ️ Skipped [{title}]: Already exists in directory (duplicate avoided).")
            continue

        # 3. Deadline check (must not be expired)
        if deadline < today:
            log(f"❌ Rejected [{title}]: Deadline has expired ({deadline} < {today}).")
            continue

        # 4. Domain Trustworthiness Check
        if not is_domain_trusted(apply_url):
            log(f"❌ Rejected [{title}]: Unofficial or untrusted domain ({apply_url}).")
            continue

        # 5. Live URL Reachability Verification
        log(f"🔍 Verifying official portal URL for: {title} ({apply_url})...")
        if not check_url_live(apply_url):
            log(f"❌ Rejected [{title}]: Official portal URL unreachable or broken ({apply_url}).")
            continue

        # Passed all checks!
        log(f"✅ Verified & Approved: {title} | {item.get('country')} | Deadline: {deadline}")
        verified_list.append(item)

    return verified_list

def update_website_data(new_scholarships, existing_scholarships):
    """Prepend new verified scholarships into js/data.js and update index.html cache-buster."""
    if not new_scholarships:
        log("No new scholarships to append.")
        return False

    all_scholarships = new_scholarships + existing_scholarships
    formatted_json = json.dumps(all_scholarships, indent=2, ensure_ascii=False)

    data_file_content = f"""/**
 * Scholarship Central - Scholarship Database
 * Automated pipeline updated on: {datetime.datetime.now().isoformat()}
 * Active Scholarships: {len(all_scholarships)}
 */

const INITIAL_SCHOLARSHIPS = {formatted_json};

// Helper functions for storage and management
const STORAGE_KEY = "scholarship_hub_items_v3";

// Clean any legacy test storage if present
try {{
  localStorage.removeItem("scholarship_hub_items_v1");
  localStorage.removeItem("scholarship_hub_items_v2");
}} catch (e) {{}}

function getStoredScholarships() {{
  try {{
    const custom = localStorage.getItem(STORAGE_KEY);
    if (!custom) {{
      return [...INITIAL_SCHOLARSHIPS];
    }}
    const parsed = JSON.parse(custom);
    // Combine custom (newest first) and initial scholarships, avoiding duplicate IDs
    const customIds = new Set(parsed.map(item => item.id));
    const defaults = INITIAL_SCHOLARSHIPS.filter(item => !customIds.has(item.id));
    return [...parsed, ...defaults];
  }} catch (err) {{
    console.error("Failed to load scholarships from localStorage:", err);
    return [...INITIAL_SCHOLARSHIPS];
  }}
}}

function saveCustomScholarship(newItem) {{
  try {{
    const custom = localStorage.getItem(STORAGE_KEY);
    let list = custom ? JSON.parse(custom) : [];
    // Prepend new item
    list = [newItem, ...list.filter(x => x.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  }} catch (err) {{
    console.error("Failed to save scholarship to localStorage:", err);
    return false;
  }}
}}

function deleteStoredScholarship(id) {{
  try {{
    const custom = localStorage.getItem(STORAGE_KEY);
    if (!custom) return false;
    let list = JSON.parse(custom);
    list = list.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  }} catch (err) {{
    console.error("Failed to delete scholarship:", err);
    return false;
  }}
}}
"""

    with open(DATA_FILE_PATH, "w", encoding="utf-8") as f:
        f.write(data_file_content)

    log(f"Successfully updated {DATA_FILE_PATH} with {len(new_scholarships)} new opportunities!")

    # Update cache-buster query parameter in index.html
    if os.path.exists(INDEX_FILE_PATH):
        with open(INDEX_FILE_PATH, "r", encoding="utf-8") as f:
            html = f.read()

        timestamp = int(datetime.datetime.now().timestamp())
        html = re.sub(r'src="js/data\.js\?v=[^"]*"', f'src="js/data.js?v={timestamp}"', html)
        html = re.sub(r'src="js/admin\.js\?v=[^"]*"', f'src="js/admin.js?v={timestamp}"', html)
        html = re.sub(r'src="js/app\.js\?v=[^"]*"', f'src="js/app.js?v={timestamp}"', html)

        with open(INDEX_FILE_PATH, "w", encoding="utf-8") as f:
            f.write(html)
        log(f"Updated cache-buster in index.html to version {timestamp}")

    return True

def main():
    log("=====================================================")
    log("Starting AI Scholarship Research & Verification Pipeline")
    log("=====================================================")

    existing = extract_current_scholarships()
    log(f"Current active scholarships in catalog: {len(existing)}")

    candidates = research_scholarships()
    if not candidates:
        log("No candidate scholarships returned by AI. Pipeline completed.")
        sys.exit(0)

    verified = verify_and_filter_candidates(candidates, existing)
    if not verified:
        log("No new scholarships passed the strict verification criteria today.")
        sys.exit(0)

    success = update_website_data(verified, existing)
    if success:
        log(f"Pipeline completed successfully. {len(verified)} verified scholarships published!")
    log("=====================================================")

if __name__ == "__main__":
    main()
