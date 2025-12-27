// Maintenance Request Types
export const REQUEST_TYPES = {
  CORRECTIVE: "CORRECTIVE",   // Breakdown
  PREVENTIVE: "PREVENTIVE"   // Routine check
};

// Maintenance Request Status (Kanban stages)
export const REQUEST_STATUS = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  REPAIRED: "REPAIRED",
  SCRAP: "SCRAP"
};

// User-friendly status order (Kanban)
export const REQUEST_STATUS_FLOW = [
  "NEW",
  "IN_PROGRESS",
  "REPAIRED",
  "SCRAP"
];

// Default durations & flags
export const DEFAULTS = {
  ESTIMATED_DURATION: 0
};
