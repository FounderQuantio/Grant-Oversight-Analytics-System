/**
 * Formatters — pure utility functions for display formatting.
 */

/** Format a number as USD currency string */
export const formatCurrency = (n = 0) =>
  `$${Number(n).toLocaleString('en-US')}`;

/** Format a number as compact millions string */
export const formatMillions = (n = 0) =>
  `$${(n / 1_000_000).toFixed(2)}M`;

/** Format a date string to locale display */
export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US') : '—';

/** Truncate a string to max length with ellipsis */
export const truncate = (str = '', max = 50) =>
  str.length <= max ? str : str.slice(0, max) + '…';

/** Severity to human label */
export const sevLabel = (sev) => sev || 'INFORMATIONAL';
