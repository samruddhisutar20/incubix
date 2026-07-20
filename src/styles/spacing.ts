/**
 * Consistent Spacing Scale for Incubix
 * ────────────────────────────────────────
 * 4px base unit = 1 space
 * Used across all components to maintain visual harmony
 */

export const SPACING = {
  // Base scale (4px unit)
  xs: '4px',   // 0.25rem / 1 unit
  sm: '8px',   // 0.5rem / 2 units
  md: '12px',  // 0.75rem / 3 units
  lg: '16px',  // 1rem / 4 units
  xl: '20px',  // 1.25rem / 5 units
  '2xl': '24px', // 1.5rem / 6 units
  '3xl': '32px', // 2rem / 8 units
  '4xl': '40px', // 2.5rem / 10 units
  '5xl': '48px', // 3rem / 12 units
} as const;

export const HEADER_HEIGHT = '72px';
export const SIDEBAR_WIDTH = '272px'; // 17rem
export const SIDEBAR_WIDTH_MOBILE = '0'; // Hidden on mobile

/**
 * Component-level spacing presets
 */
export const COMPONENT_SPACING = {
  // Card padding
  cardPaddingDefault: SPACING.lg,
  cardPaddingLarge: SPACING['2xl'],
  
  // Input/Button heights
  buttonHeightXs: '32px',
  buttonHeightSm: '36px',
  buttonHeightMd: '44px',
  buttonHeightLg: '48px',
  
  // Input height
  inputHeight: '44px',
  
  // Gaps
  gapXs: SPACING.xs,
  gapSm: SPACING.sm,
  gapMd: SPACING.md,
  gapLg: SPACING.lg,
  gapXl: SPACING.xl,
  
  // Modal/Dropdown padding
  modalPadding: SPACING['2xl'],
  dropdownItemPadding: `${SPACING.md} ${SPACING.lg}`,
} as const;
