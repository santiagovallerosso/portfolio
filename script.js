/**
 * @file script.js
 * @description Production-grade DOM scroll & section tracker with cached offsets.
 */

// Memory Cache for section coordinates to avoid expensive getBoundingClientRect layout thrashing
let cachedOffsets = null;

/**
 * Calculates and caches the vertical offsets for section elements.
 * @param {string[]} sectionIds - Array of section IDs (e.g. ['home', 'about', 'services'])
 * @returns {Record<string, number>} Object mapping section ID to its vertical coordinate
 */
function updateSectionOffsets(sectionIds) {
  if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
    cachedOffsets = {};
    return cachedOffsets;
  }

  const offsets = {};
  sectionIds.forEach((id) => {
    // Standard mock selector for testing / modular usage
    const element = document.getElementById(id);
    if (element) {
      // Offset calculation with standard window scroll offset inclusion
      offsets[id] = element.getBoundingClientRect().top + window.scrollY;
    } else {
      offsets[id] = 0;
    }
  });

  cachedOffsets = offsets;
  return offsets;
}

/**
 * Retrieves the current cached offsets, or recalculates them if the cache is empty.
 * @param {string[]} sectionIds
 * @returns {Record<string, number>}
 */
function getSectionOffsets(sectionIds) {
  if (!cachedOffsets) {
    return updateSectionOffsets(sectionIds);
  }
  return cachedOffsets;
}

/**
 * Determines the currently active segment ID based on the scroll position.
 * @param {number} scrollY
 * @param {Record<string, number>} offsets
 * @returns {string|null} Active section ID or null
 */
function determineActiveSection(scrollY, offsets) {
  if (!offsets || Object.keys(offsets).length === 0) return null;

  let activeSection = null;
  // Dynamic threshold of 100px before section enters viewport
  const threshold = 100;

  for (const [id, offset] of Object.entries(offsets)) {
    if (scrollY >= offset - threshold) {
      activeSection = id;
    }
  }

  return activeSection;
}

/**
 * Invalidates the cached offsets (used during resize events).
 */
function invalidateOffsetCache() {
  cachedOffsets = null;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateSectionOffsets,
        getSectionOffsets,
        determineActiveSection,
        invalidateOffsetCache,
        // Helper to let Jest clear the module-scoped variables:
        resetCache: () => {
            cachedOffsets = null;
        }
    };
}