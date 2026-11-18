/**
 * Scholarship Hub — Core Application Logic
 * Fast, responsive, accessible and modular.
 */

// Application State
const state = {
  scholarships: [],
  filteredScholarships: [],
  bookmarks: new Set(),
  activeCategory: "all",
  activeLevel: "all",
  activeCountry: "all",
  activeFunding: "all",
  searchQuery: "",
  sortBy: "newest",
  isSavedView: false
};

const BOOKMARKS_STORAGE_KEY = "scholarship_hub_bookmarks_v1";
const THEME_STORAGE_KEY = "scholarship_hub_theme";

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadBookmarks();
  loadData();
  initSearch();
  initCategoryPills();
  initFilters();
  initSort();
  initModals();
  initMobileDrawer();
  initNewsletter();
  initCustomEventListeners();
});

/* ==========================================================================
   Theme (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";

  if (savedTheme === "dark") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      if (isDark) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem(THEME_STORAGE_KEY, "light");
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem(THEME_STORAGE_KEY, "dark");
      }
    });
  }
}

/* ==========================================================================
   Bookmarks Persistence
   ========================================================================== */
function loadBookmarks() {
  try {
    const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (saved) {
      state.bookmarks = new Set(JSON.parse(saved));
    }
  } catch (err) {
    console.error("Could not load bookmarks:", err);
    state.bookmarks = new Set();
  }
  updateBookmarkBadges();
}

function toggleBookmark(id) {
  if (state.bookmarks.has(id)) {
    state.bookmarks.delete(id);
    showToast("Removed from saved scholarships.");
  } else {
    state.bookmarks.add(id);
    showToast("❤️ Saved to your bookmarked scholarships!");
  }
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify([...state.bookmarks]));
  updateBookmarkBadges();
  renderScholarships();
}

function updateBookmarkBadges() {
  const count = state.bookmarks.size;
  const navBadge = document.getElementById("savedCountBadge");
  const mobileCount = document.getElementById("mobileSavedCount");

  if (navBadge) navBadge.textContent = count;
  if (mobileCount) mobileCount.textContent = count;
}

/* ==========================================================================
   Data Loading & Metrics
   ========================================================================== */
function loadData() {
  state.scholarships = getStoredScholarships();
  updateStatsRibbon();
  applyFiltersAndRender();
}

function updateStatsRibbon() {
  const total = state.scholarships.length;
  const pakistanCount = state.scholarships.filter(s => 
    s.categories.includes("pakistan") || (s.country && s.country.toLowerCase() === "pakistan")
  ).length;
  const internationalCount = state.scholarships.filter(s => 
    s.categories.includes("international") || (s.country && s.country.toLowerCase() !== "pakistan")
  ).length;
  const fullyFunded = state.scholarships.filter(s => 
    s.categories.includes("fully-funded") || (s.fundingType && s.fundingType.toLowerCase() === "fully funded")
  ).length;

  const totalEl = document.getElementById("totalScholarshipsCount");
  const pkEl = document.getElementById("pakistanScholarshipsCount");
  const intlEl = document.getElementById("internationalScholarshipsCount");
  const fullyEl = document.getElementById("fullyFundedCount");

  if (totalEl) totalEl.textContent = total;
  if (pkEl) pkEl.textContent = pakistanCount;
  if (intlEl) intlEl.textContent = internationalCount;
  if (fullyEl) fullyEl.textContent = fullyFunded;
}

/* ==========================================================================
   Search Functionality
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const value = e.target.value.trim();
    state.searchQuery = value;

    if (clearBtn) {
      clearBtn.style.display = value ? "block" : "none";
    }

    debounceTimer = setTimeout(() => {
      applyFiltersAndRender();
    }, 200);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearBtn.style.display = "none";
      searchInput.focus();
      applyFiltersAndRender();
    });
  }
}

/* ==========================================================================
   Category Pills Navigation
   ========================================================================== */
function initCategoryPills() {
  const pillButtons = document.querySelectorAll(".cat-pill");

  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      pillButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      state.activeCategory = btn.dataset.category || "all";
      state.isSavedView = false;
      document.getElementById("savedViewNotice").style.display = "none";
      applyFiltersAndRender();
    });
  });

  // Footer Category links
  document.querySelectorAll(".footer-cat-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCat = link.dataset.cat;
      const targetPill = document.querySelector(`.cat-pill[data-category="${targetCat}"]`);
      if (targetPill) targetPill.click();
      window.scrollTo({ top: document.getElementById("scholarships").offsetTop - 80, behavior: "smooth" });
    });
  });

  // Footer Level links
  document.querySelectorAll(".footer-level-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const level = link.dataset.lvl;
      const levelSelect = document.getElementById("levelFilter");
      if (levelSelect) {
        levelSelect.value = level;
        state.activeLevel = level;
        applyFiltersAndRender();
      }
      window.scrollTo({ top: document.getElementById("scholarships").offsetTop - 80, behavior: "smooth" });
    });
  });

  // Saved nav button
  const savedNavBtn = document.getElementById("savedNavBtn");
  const mobileSavedLink = document.getElementById("mobileSavedLink");

  const openSavedView = (e) => {
    e.preventDefault();
    state.isSavedView = true;
    pillButtons.forEach(b => b.classList.remove("active"));
    document.getElementById("savedViewNotice").style.display = "flex";
    applyFiltersAndRender();
    window.scrollTo({ top: document.getElementById("scholarships").offsetTop - 80, behavior: "smooth" });
  };

  if (savedNavBtn) savedNavBtn.addEventListener("click", openSavedView);
  if (mobileSavedLink) mobileSavedLink.addEventListener("click", openSavedView);

  const exitSavedBtn = document.getElementById("exitSavedViewBtn");
  if (exitSavedBtn) {
    exitSavedBtn.addEventListener("click", () => {
      state.isSavedView = false;
      document.getElementById("savedViewNotice").style.display = "none";
      const allPill = document.querySelector('.cat-pill[data-category="all"]');
      if (allPill) allPill.classList.add("active");
      state.activeCategory = "all";
      applyFiltersAndRender();
    });
  }
}

/* ==========================================================================
   Filter Selects
   ========================================================================== */
function initFilters() {
  const levelFilter = document.getElementById("levelFilter");
  const countryFilter = document.getElementById("countryFilter");
  const fundingFilter = document.getElementById("fundingFilter");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");

  if (levelFilter) {
    levelFilter.addEventListener("change", (e) => {
      state.activeLevel = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (countryFilter) {
    countryFilter.addEventListener("change", (e) => {
      state.activeCountry = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (fundingFilter) {
    fundingFilter.addEventListener("change", (e) => {
      state.activeFunding = e.target.value;
      applyFiltersAndRender();
    });
  }

  const resetAll = () => {
    state.activeCategory = "all";
    state.activeLevel = "all";
    state.activeCountry = "all";
    state.activeFunding = "all";
    state.searchQuery = "";
    state.isSavedView = false;

    if (levelFilter) levelFilter.value = "all";
    if (countryFilter) countryFilter.value = "all";
    if (fundingFilter) fundingFilter.value = "all";

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("clearSearchBtn");
    if (clearBtn) clearBtn.style.display = "none";

    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
    const allPill = document.querySelector('.cat-pill[data-category="all"]');
    if (allPill) allPill.classList.add("active");

    document.getElementById("savedViewNotice").style.display = "none";
    applyFiltersAndRender();
  };

  if (resetBtn) resetBtn.addEventListener("click", resetAll);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAll);
}

/* ==========================================================================
   Sorting Control
   ========================================================================== */
function initSort() {
  const sortSelect = document.getElementById("sortBySelect");
  if (!sortSelect) return;

  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    applyFiltersAndRender();
  });
}

/* ==========================================================================
   Filtering & Sorting Engine
   ========================================================================== */
function applyFiltersAndRender() {
  let list = [...state.scholarships];

  // 1. Saved View Check
  if (state.isSavedView) {
    list = list.filter(item => state.bookmarks.has(item.id));
  }

  // 2. Search Query Matching (title, institution, country, description, eligibility)
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(item => {
      const matchTitle = item.title && item.title.toLowerCase().includes(q);
      const matchInst = item.institution && item.institution.toLowerCase().includes(q);
      const matchCountry = item.country && item.country.toLowerCase().includes(q);
      const matchSummary = item.summary && item.summary.toLowerCase().includes(q);
      const matchLevel = item.level && item.level.toLowerCase().includes(q);
      const matchEligibility = item.eligibility && item.eligibility.some(e => e.toLowerCase().includes(q));
      return matchTitle || matchInst || matchCountry || matchSummary || matchLevel || matchEligibility;
    });
  }

  // 3. Category Pills Matching
  if (state.activeCategory !== "all") {
    const cat = state.activeCategory;
    if (cat === "pakistan") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("pakistan")) ||
        (item.country && item.country.toLowerCase() === "pakistan")
      );
    } else if (cat === "international") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("international")) ||
        (item.country && item.country.toLowerCase() !== "pakistan")
      );
    } else if (cat === "undergraduate") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("undergraduate")) ||
        (item.level && item.level.toLowerCase().includes("undergraduate")) ||
        (item.educationLevels && item.educationLevels.includes("Undergraduate"))
      );
    } else if (cat === "masters") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("masters")) ||
        (item.level && item.level.toLowerCase().includes("master")) ||
        (item.educationLevels && item.educationLevels.includes("Master's"))
      );
    } else if (cat === "phd") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("phd")) ||
        (item.level && item.level.toLowerCase().includes("phd")) ||
        (item.educationLevels && item.educationLevels.includes("PhD"))
      );
    } else if (cat === "fully-funded") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("fully-funded")) ||
        (item.fundingType && item.fundingType.toLowerCase() === "fully funded")
      );
    } else if (cat === "government") {
      list = list.filter(item => 
        (item.categories && item.categories.includes("government")) ||
        item.isGovernment === true
      );
    } else if (cat === "school-college") {
      list = list.filter(item => 
        (item.level && (item.level.toLowerCase().includes("school") || item.level.toLowerCase().includes("college"))) ||
        (item.educationLevels && (item.educationLevels.includes("School") || item.educationLevels.includes("College")))
      );
    }
  }

  // 4. Study Level Filter Dropdown
  if (state.activeLevel !== "all") {
    const targetLevel = state.activeLevel.toLowerCase();
    list = list.filter(item => {
      const matchLevel = item.level && item.level.toLowerCase().includes(targetLevel);
      const matchArray = item.educationLevels && item.educationLevels.some(l => l.toLowerCase().includes(targetLevel));
      return matchLevel || matchArray;
    });
  }

  // 5. Country Filter Dropdown
  if (state.activeCountry !== "all") {
    const targetCountry = state.activeCountry.toLowerCase();
    list = list.filter(item => item.country && item.country.toLowerCase() === targetCountry);
  }

  // 6. Funding Type Filter Dropdown
  if (state.activeFunding !== "all") {
    const targetFunding = state.activeFunding.toLowerCase();
    list = list.filter(item => item.fundingType && item.fundingType.toLowerCase().includes(targetFunding));
  }

  // 7. Sorting
  if (state.sortBy === "newest") {
    // Keep order or featured first
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else if (state.sortBy === "deadline-asc") {
    list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (state.sortBy === "deadline-desc") {
    list.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  } else if (state.sortBy === "title-asc") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  state.filteredScholarships = list;
  renderScholarships();
  renderActiveFilterTags();
}

/* ==========================================================================
   Render Active Filter Tags
   ========================================================================== */
function renderActiveFilterTags() {
  const container = document.getElementById("activeFilterTags");
  if (!container) return;

  const tags = [];

  if (state.activeCategory !== "all") {
    tags.push({ label: `Category: ${state.activeCategory}`, type: "category" });
  }
  if (state.activeLevel !== "all") {
    tags.push({ label: `Level: ${state.activeLevel}`, type: "level" });
  }
  if (state.activeCountry !== "all") {
    tags.push({ label: `Country: ${state.activeCountry}`, type: "country" });
  }
  if (state.activeFunding !== "all") {
    tags.push({ label: `Funding: ${state.activeFunding}`, type: "funding" });
  }
  if (state.searchQuery) {
    tags.push({ label: `Query: "${state.searchQuery}"`, type: "search" });
  }

  if (tags.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = tags.map(t => `
    <span class="active-tag">
      ${t.label}
      <span class="active-tag-remove" data-type="${t.type}">×</span>
    </span>
  `).join("");

  container.querySelectorAll(".active-tag-remove").forEach(rm => {
    rm.addEventListener("click", () => {
      const type = rm.dataset.type;
      if (type === "category") {
        state.activeCategory = "all";
        document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
        const allPill = document.querySelector('.cat-pill[data-category="all"]');
        if (allPill) allPill.classList.add("active");
      } else if (type === "level") {
        state.activeLevel = "all";
        const sel = document.getElementById("levelFilter");
        if (sel) sel.value = "all";
      } else if (type === "country") {
        state.activeCountry = "all";
        const sel = document.getElementById("countryFilter");
        if (sel) sel.value = "all";
      } else if (type === "funding") {
        state.activeFunding = "all";
        const sel = document.getElementById("fundingFilter");
        if (sel) sel.value = "all";
      } else if (type === "search") {
        state.searchQuery = "";
        const input = document.getElementById("searchInput");
        if (input) input.value = "";
        const clearBtn = document.getElementById("clearSearchBtn");
        if (clearBtn) clearBtn.style.display = "none";
      }
      applyFiltersAndRender();
    });
  });
}

/* ==========================================================================
   Render Cards to DOM
   ========================================================================== */
function renderScholarships() {
  const grid = document.getElementById("scholarshipGrid");
  const noResults = document.getElementById("noResultsState");
  const countEl = document.getElementById("resultsCount");

  const list = state.filteredScholarships;

  if (countEl) {
    countEl.textContent = `Showing ${list.length} ${list.length === 1 ? 'scholarship' : 'scholarships'}`;
  }

  if (list.length === 0) {
    grid.innerHTML = "";
    if (noResults) {
      if (state.scholarships.length === 0) {
        // Completely blank directory awaiting AI pipeline
        noResults.innerHTML = `
          <div class="empty-state-icon">🎓</div>
          <h3>Scholarship Directory Ready</h3>
          <p>No scholarships are currently posted. Daily opportunities from universities, governments, and institutions across Pakistan and worldwide will appear here via your automated pipeline.</p>
          <button id="emptyPostManualBtn" class="btn btn-primary">+ Post Scholarship</button>
        `;
        const postBtn = document.getElementById("emptyPostManualBtn");
        if (postBtn) {
          postBtn.addEventListener("click", () => {
            if (typeof openPostModal === "function") openPostModal();
          });
        }
      } else {
        // Filter or search yielded 0 results
        noResults.innerHTML = `
          <div class="empty-state-icon">🔍</div>
          <h3>No scholarships found</h3>
          <p>We couldn't find any scholarship matching your current filters. Try adjusting your search query or resetting your filters.</p>
          <button id="emptyResetBtn" class="btn btn-primary">Clear All Filters</button>
        `;
        const resetBtn = document.getElementById("emptyResetBtn");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            const resetBtnToolbar = document.getElementById("resetFiltersBtn");
            if (resetBtnToolbar) resetBtnToolbar.click();
          });
        }
      }
      noResults.style.display = "block";
    }
    return;
  }

  if (noResults) noResults.style.display = "none";

  grid.innerHTML = list.map(item => createCardHTML(item)).join("");

  // Attach card event listeners
  grid.querySelectorAll(".bookmark-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleBookmark(btn.dataset.id);
    });
  });

  grid.querySelectorAll(".btn-card-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      openDetailModal(btn.dataset.id);
    });
  });
}

function createCardHTML(item) {
  const isSaved = state.bookmarks.has(item.id);
  const countryFlag = getCountryEmoji(item.country, item.countryCode);
  const deadlineInfo = formatDeadline(item.deadline);

  // Tags
  const isFullyFunded = item.fundingType && item.fundingType.toLowerCase().includes("fully funded");
  const isGov = item.isGovernment;
  
  // First 2 eligibility bullets
  const eligibilitySnippet = (item.eligibility && item.eligibility.length > 0)
    ? item.eligibility.slice(0, 2).map(e => `<li>${escapeHTML(e)}</li>`).join("")
    : `<li>Open to eligible applicants per institutional guidelines.</li>`;

  return `
    <article class="scholarship-card" data-id="${item.id}">
      <div>
        <div class="card-top">
          <span class="card-country-badge">
            <span class="flag-icon">${countryFlag}</span>
            <span>${escapeHTML(item.country || "Worldwide")}</span>
          </span>
          <div class="card-actions-top">
            <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${item.id}" title="${isSaved ? 'Remove Bookmark' : 'Save Scholarship'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <h3 class="card-title">${escapeHTML(item.title)}</h3>
        
        <div class="card-institution">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3l3-2 3 2v4H9z"/>
          </svg>
          <span>${escapeHTML(item.institution)}</span>
        </div>

        <div class="card-tags">
          <span class="tag-pill ${isFullyFunded ? 'tag-fully-funded' : 'tag-partial'}">
            ${isFullyFunded ? '💯 Fully Funded' : escapeHTML(item.fundingType)}
          </span>
          <span class="tag-pill tag-level">
            🎓 ${escapeHTML(item.level)}
          </span>
          ${isGov ? `<span class="tag-pill tag-government">🏛️ Government</span>` : ''}
        </div>

        <div class="card-specs">
          <div class="spec-item">
            <span class="spec-label">Funding Type</span>
            <span class="spec-value">${escapeHTML(item.fundingType)}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Deadline</span>
            <span class="spec-value ${deadlineInfo.isUrgent ? 'deadline-urgent' : ''}">
              ${deadlineInfo.formatted}
            </span>
          </div>
        </div>

        <div class="card-summary">
          <p style="margin-bottom: 0.35rem;"><strong>Key Eligibility:</strong></p>
          <ul class="bullet-list" style="margin-top: 0.2rem;">
            ${eligibilitySnippet}
          </ul>
        </div>
      </div>

      <div class="card-footer">
        <div class="card-footer-btns">
          <button class="btn btn-outline btn-card-detail" data-id="${item.id}">
            View Details
          </button>
          <a href="${escapeHTML(item.applyLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-card-apply">
            <span>Apply Now</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   Detail Modal & Popups
   ========================================================================== */
function initModals() {
  const detailModal = document.getElementById("detailModal");
  const closeBtn = document.getElementById("closeDetailModalBtn");
  const bookmarkBtn = document.getElementById("modalBookmarkBtn");
  const shareBtn = document.getElementById("modalShareBtn");

  if (closeBtn) closeBtn.addEventListener("click", closeDetailModal);

  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailModal && detailModal.classList.contains("open")) {
      closeDetailModal();
    }
  });

  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => {
      const id = bookmarkBtn.dataset.id;
      if (id) {
        toggleBookmark(id);
        const isSaved = state.bookmarks.has(id);
        const label = document.getElementById("modalBookmarkLabel");
        if (label) label.textContent = isSaved ? "Saved" : "Save";
        bookmarkBtn.querySelector(".heart-icon").style.fill = isSaved ? "var(--danger)" : "none";
        bookmarkBtn.querySelector(".heart-icon").style.color = isSaved ? "var(--danger)" : "currentColor";
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const id = shareBtn.dataset.id;
      const item = state.scholarships.find(s => s.id === id);
      if (!item) return;

      const shareData = {
        title: item.title,
        text: `Check out this scholarship: ${item.title} at ${item.institution} (${item.country}). Deadline: ${item.deadline}`,
        url: item.applyLink || window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(`${shareData.text}\nOfficial Link: ${shareData.url}`).then(() => {
          showToast("📋 Scholarship details copied to clipboard!");
        }).catch(() => {
          showToast("Link: " + shareData.url);
        });
      }
    });
  }
}

function openDetailModal(id) {
  const item = state.scholarships.find(s => s.id === id);
  if (!item) return;

  const modal = document.getElementById("detailModal");
  const tagsContainer = document.getElementById("modalTags");
  const titleEl = document.getElementById("modalTitle");
  const metaRow = document.getElementById("modalMetaRow");
  const highlightBox = document.getElementById("modalHighlightBox");
  const specsGrid = document.getElementById("modalSpecsGrid");
  const coverageList = document.getElementById("modalCoverageList");
  const eligibilityList = document.getElementById("modalEligibilityList");
  const documentsList = document.getElementById("modalDocumentsList");
  const applyBtn = document.getElementById("modalApplyBtn");
  const bookmarkBtn = document.getElementById("modalBookmarkBtn");
  const bookmarkLabel = document.getElementById("modalBookmarkLabel");
  const shareBtn = document.getElementById("modalShareBtn");

  const countryFlag = getCountryEmoji(item.country, item.countryCode);
  const deadlineInfo = formatDeadline(item.deadline);
  const isSaved = state.bookmarks.has(item.id);

  // Tags
  tagsContainer.innerHTML = `
    <span class="card-country-badge">
      <span>${countryFlag}</span>
      <span>${escapeHTML(item.country)}</span>
    </span>
    <span class="tag-pill tag-fully-funded">
      ${escapeHTML(item.fundingType)}
    </span>
    <span class="tag-pill tag-level">
      🎓 ${escapeHTML(item.level)}
    </span>
    ${item.isGovernment ? `<span class="tag-pill tag-government">🏛️ Government Scheme</span>` : ''}
  `;

  titleEl.textContent = item.title;

  metaRow.innerHTML = `
    <span class="modal-meta-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3l3-2 3 2v4H9z"/></svg>
      <strong>${escapeHTML(item.institution)}</strong>
    </span>
    <span>•</span>
    <span class="modal-meta-item">
      📅 Deadline: <strong class="${deadlineInfo.isUrgent ? 'spec-value deadline-urgent' : ''}">${deadlineInfo.formatted}</strong>
    </span>
  `;

  highlightBox.innerHTML = `
    <strong>Overview:</strong> ${escapeHTML(item.summary || "Complete scholarship package offered to prospective candidates.")}
  `;

  specsGrid.innerHTML = `
    <div class="spec-item">
      <span class="spec-label">Funding Status</span>
      <span class="spec-value">${escapeHTML(item.fundingType)}</span>
    </div>
    <div class="spec-item">
      <span class="spec-label">Education Tier</span>
      <span class="spec-value">${escapeHTML(item.level)}</span>
    </div>
    <div class="spec-item">
      <span class="spec-label">Application Status</span>
      <span class="spec-value" style="color: var(--primary);">🟢 Open / Active</span>
    </div>
  `;

  // Financial Coverage List
  coverageList.innerHTML = (item.coverage && item.coverage.length > 0)
    ? item.coverage.map(c => `<li>${escapeHTML(c)}</li>`).join("")
    : `<li>Full or partial tuition grant per program regulations.</li>`;

  // Eligibility Criteria List
  eligibilityList.innerHTML = (item.eligibility && item.eligibility.length > 0)
    ? item.eligibility.map(e => `<li>${escapeHTML(e)}</li>`).join("")
    : `<li>Applicant must fulfill official admissions criteria.</li>`;

  // Required Documents List
  documentsList.innerHTML = (item.documents && item.documents.length > 0)
    ? item.documents.map(d => `<li>${escapeHTML(d)}</li>`).join("")
    : `<li>Official educational certificates and transcripts.</li><li>National Identity Card / Passport.</li>`;

  // Footer Actions
  applyBtn.href = item.applyLink;
  bookmarkBtn.dataset.id = item.id;
  shareBtn.dataset.id = item.id;

  if (bookmarkLabel) bookmarkLabel.textContent = isSaved ? "Saved" : "Save";
  const heartIcon = bookmarkBtn.querySelector(".heart-icon");
  if (heartIcon) {
    heartIcon.style.fill = isSaved ? "var(--danger)" : "none";
    heartIcon.style.color = isSaved ? "var(--danger)" : "currentColor";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ==========================================================================
   Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeDrawerBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (menuBtn) menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("subscriberEmail").value.trim();
    if (email) {
      try {
        const subscribers = JSON.parse(localStorage.getItem("scholarship_hub_subscribers") || "[]");
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem("scholarship_hub_subscribers", JSON.stringify(subscribers));
        }
      } catch (e) {}
      showToast(`🎉 You're subscribed! Daily scholarship alerts will be sent to ${email}`);
      form.reset();
    }
  });
}

/* ==========================================================================
   Custom Event Listeners (Admin Actions Sync)
   ========================================================================== */
function initCustomEventListeners() {
  window.addEventListener("scholarshipAdded", (e) => {
    state.scholarships = getStoredScholarships();
    updateStatsRibbon();
    applyFiltersAndRender();
  });

  window.addEventListener("scholarshipReset", () => {
    state.scholarships = getStoredScholarships();
    updateStatsRibbon();
    applyFiltersAndRender();
  });
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function formatDeadline(dateStr) {
  if (!dateStr) return { formatted: "Check portal", isUrgent: false };

  const deadline = new Date(dateStr);
  const now = new Date();
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = deadline.toLocaleDateString("en-US", options);

  if (diffDays < 0) {
    return { formatted: `${formattedDate} (Expired)`, isUrgent: true };
  } else if (diffDays <= 7) {
    return { formatted: `${formattedDate} (${diffDays}d left!)`, isUrgent: true };
  } else if (diffDays <= 30) {
    return { formatted: `${formattedDate} (${diffDays} days left)`, isUrgent: false };
  } else {
    return { formatted: formattedDate, isUrgent: false };
  }
}

function getCountryEmoji(countryName = "", code = "") {
  if (code && code.length === 2 && code !== "🌍") {
    // Convert 2-letter ISO code to regional indicator symbol emoji
    return code
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  }

  const c = countryName.toLowerCase();
  if (c.includes("pakistan")) return "🇵🇰";
  if (c.includes("united states") || c.includes("usa")) return "🇺🇸";
  if (c.includes("united kingdom") || c.includes("uk")) return "🇬🇧";
  if (c.includes("germany")) return "🇩🇪";
  if (c.includes("turkey") || c.includes("türkiye")) return "🇹🇷";
  if (c.includes("hungary")) return "🇭🇺";
  if (c.includes("japan")) return "🇯🇵";
  if (c.includes("china")) return "🇨🇳";
  if (c.includes("australia")) return "🇦🇺";
  if (c.includes("singapore")) return "🇸🇬";
  if (c.includes("canada")) return "🇨🇦";
  if (c.includes("european union") || c.includes("europe")) return "🇪🇺";
  return "🌍";
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
