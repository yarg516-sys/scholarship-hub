/**
 * Scholarship Central - Scholarship Database
 * Completely blank catalog ready for AI automation pipeline ingestion.
 *
 * Pipeline JSON Schema:
 * {
 *   id: "unique-slug-id",
 *   title: "Scholarship Title",
 *   institution: "Institution or Organization Name",
 *   country: "Country Name (e.g. Pakistan, United States, Germany)",
 *   countryCode: "ISO 2-letter Code (e.g. PK, US, GB, DE)",
 *   level: "School | College | Undergraduate | Master's | PhD",
 *   fundingType: "Fully Funded | Partially Funded | Tuition Waiver",
 *   isGovernment: true | false,
 *   isInternational: true | false,
 *   categories: ["pakistan" | "international", "undergraduate" | "masters" | "phd", "fully-funded", "government"],
 *   educationLevels: ["School" | "College" | "Undergraduate" | "Master's" | "PhD"],
 *   deadline: "YYYY-MM-DD",
 *   applyLink: "https://...",
 *   featured: true | false,
 *   summary: "Brief description of the scholarship opportunity.",
 *   eligibility: ["Eligibility bullet point 1", "Eligibility bullet point 2"],
 *   coverage: ["Benefit 1 (e.g. 100% tuition)", "Benefit 2 (e.g. living allowance)"],
 *   documents: ["Document requirement 1", "Document requirement 2"]
 * }
 */

const INITIAL_SCHOLARSHIPS = [];

// Helper functions for storage and management
const STORAGE_KEY = "scholarship_hub_items_v3";

// Clean any legacy test storage if present
try {
  localStorage.removeItem("scholarship_hub_items_v1");
  localStorage.removeItem("scholarship_hub_items_v2");
} catch (e) {}

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
