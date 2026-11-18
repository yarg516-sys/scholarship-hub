/**
 * Scholarship Central - Admin & Publisher Module
 * Handles adding daily scholarships, persisting to localStorage,
 * and exporting updated database JSON for developers.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdminPostModal();
  initDatabaseTools();
});

// Flag map helper for common country codes
const COUNTRY_CODES = {
  "pakistan": "PK",
  "united states": "US",
  "usa": "US",
  "united kingdom": "GB",
  "uk": "GB",
  "germany": "DE",
  "turkey": "TR",
  "hungary": "HU",
  "japan": "JP",
  "european union": "EU",
  "eu": "EU",
  "australia": "AU",
  "china": "CN",
  "singapore": "SG",
  "canada": "CA",
  "saudi arabia": "SA",
  "uae": "AE",
  "south korea": "KR",
  "malaysia": "MY",
  "france": "FR",
  "italy": "IT"
};

function initAdminPostModal() {
  const postModal = document.getElementById("postScholarshipModal");
  const postTriggers = [
    document.getElementById("postModalTriggerTop"),
    document.getElementById("postModalTrigger"),
    document.getElementById("mobilePostBtn"),
    document.getElementById("footerPostBtn")
  ].filter(Boolean);

  const closeBtn = document.getElementById("closePostModalBtn");
  const cancelBtn = document.getElementById("cancelPostBtn");
  const postForm = document.getElementById("postScholarshipForm");

  // Open Modal
  postTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openPostModal();
    });
  });

  // Close Modal
  if (closeBtn) closeBtn.addEventListener("click", closePostModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closePostModal);

  // Close on backdrop click
  if (postModal) {
    postModal.addEventListener("click", (e) => {
      if (e.target === postModal) closePostModal();
    });
  }

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && postModal && postModal.classList.contains("open")) {
      closePostModal();
    }
  });

  // Form Submission
  if (postForm) {
    postForm.addEventListener("submit", handlePostFormSubmit);
  }
}

function openPostModal() {
  const modal = document.getElementById("postScholarshipModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Pre-fill minimum date to today
  const deadlineInput = document.getElementById("postDeadline");
  if (deadlineInput) {
    const today = new Date().toISOString().split("T")[0];
    deadlineInput.min = today;
  }

  // Focus first input
  setTimeout(() => {
    const titleInput = document.getElementById("postTitle");
    if (titleInput) titleInput.focus();
  }, 100);
}

function closePostModal() {
  const modal = document.getElementById("postScholarshipModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function handlePostFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const institution = document.getElementById("postInstitution").value.trim();
  const country = document.getElementById("postCountry").value.trim();
  const level = document.getElementById("postLevel").value;
  const fundingType = document.getElementById("postFunding").value;
  const deadline = document.getElementById("postDeadline").value;
  const applyLink = document.getElementById("postApplyLink").value.trim();
  const summary = document.getElementById("postSummary").value.trim();
  
  // Parse multi-line strings into arrays
  const eligibility = document.getElementById("postEligibility").value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const coverage = document.getElementById("postCoverage").value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const documents = document.getElementById("postDocuments").value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  // Selected categories
  const selectedCategories = Array.from(
    document.querySelectorAll("input[name='postCategories']:checked")
  ).map(cb => cb.value);

  // Derive country code
  const countryLower = country.toLowerCase();
  const countryCode = COUNTRY_CODES[countryLower] || "🌍";

  const isPakistan = countryLower.includes("pakistan") || selectedCategories.includes("pakistan");
  const isGov = selectedCategories.includes("government");

  if (!isPakistan && !selectedCategories.includes("international")) {
    selectedCategories.push("international");
  }

  // Generate unique slug
  const slugId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") + "-" + Date.now().toString().slice(-4);

  const newScholarship = {
    id: slugId,
    title,
    institution,
    country,
    countryCode,
    level,
    fundingType,
    isGovernment: isGov,
    isInternational: !isPakistan,
    categories: selectedCategories,
    educationLevels: [level],
    deadline,
    applyLink,
    featured: true,
    summary,
    eligibility: eligibility.length ? eligibility : ["Open to qualified candidates meeting program admission requirements."],
    coverage: coverage.length ? coverage : [fundingType + " scholarship benefit according to institution guidelines."],
    documents: documents.length ? documents : ["Academic transcripts and degree copies.", "Official application form."]
  };

  const success = saveCustomScholarship(newScholarship);

  if (success) {
    showToast("🎉 Scholarship published successfully! It is now live in the directory.");
    document.getElementById("postScholarshipForm").reset();
    closePostModal();

    // Trigger update in main app feed
    window.dispatchEvent(new CustomEvent("scholarshipAdded", { detail: newScholarship }));
  } else {
    showToast("⚠️ Could not save scholarship. Please check browser storage permissions.", true);
  }
}

// Database tools: Export JSON & Reset to defaults
function initDatabaseTools() {
  const exportBtn = document.getElementById("exportJsonBtn");
  const resetBtn = document.getElementById("resetStorageBtn");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const allData = getStoredScholarships();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `scholarships-database-${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("📥 Exported scholarships database JSON file!");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset scholarship feed to default official catalog? Custom entries added in this browser will be cleared.")) {
        localStorage.removeItem(STORAGE_KEY);
        showToast("🔄 Database reset to default catalog.");
        window.dispatchEvent(new CustomEvent("scholarshipReset"));
      }
    });
  }
}

// Helper: Toast Alert
function showToast(message, isError = false) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span class="toast-icon">${isError ? '⚠️' : '✓'}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 4000);
}
