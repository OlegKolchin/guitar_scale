// constants/fretboardLayout.ts

/**
 * Layout constants for guitar fretboard positioning and sizing
 * All measurements are carefully calibrated for optimal visual appearance
 */

// ============================================================================
// FRETBOARD LAYOUT
// ============================================================================

export const FRETBOARD_LAYOUT = {
    /**
     * Vertical offset percentage for string positioning from top edge
     * Ensures strings don't touch the top of the fretboard
     */
    STRING_OFFSET_PERCENT: 6.6,

    /**
     * Adjustment value for fine-tuning note positioning on strings
     * Subtracts from string offset to center notes properly
     */
    NOTE_VERTICAL_ADJUSTMENT: 5,

    /**
     * Additional offset in pixels for fret dot markers below the fretboard
     */
    FRET_DOT_OFFSET_ADDITION: 5,

    /**
     * Left margin spacing for the fretboard container
     * Creates breathing room from the left edge
     */
    INITIAL_LEFT_MARGIN_PX: 9.5,

    /**
     * Horizontal offset percentage for open string note labels
     * Negative value positions them to the left of the fretboard
     */
    OPEN_STRING_LEFT_OFFSET_PERCENT: -2,

    /**
     * Default number of frets to display on the fretboard
     */
    DEFAULT_NUMBER_OF_FRETS: 15,

    /**
     * Standard guitar tuning has 6 strings
     */
    STANDARD_TUNING_STRINGS: 6,
} as const;

// ============================================================================
// FRET MARKERS
// ============================================================================

/**
 * Fret positions where numbers/dots should be displayed
 * Typically shows all frets from 1 to 15
 */
export const STANDARD_FRET_MARKERS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
] as const;

/**
 * Traditional guitar fret markers (for future use)
 * Shows dots at: 3, 5, 7, 9, 12 (double dot), 15, 17, 19, 21 (double dot)
 */
export const TRADITIONAL_FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21] as const;

// ============================================================================
// MUSIC NOTE DISPLAY
// ============================================================================

export const NOTE_DISPLAY = {
    /**
     * Responsive size for note circles
     * Uses minimum of viewport width or height to maintain circular shape
     */
    SIZE_RESPONSIVE: 'min(2vw, 2vh)',

    /**
     * Minimum pixel size for note circles
     * Ensures readability on small screens
     */
    MIN_SIZE_PX: 19,

    /**
     * Maximum pixel size for note circles
     * Prevents notes from becoming too large on big screens
     */
    MAX_SIZE_PX: 24,

    /**
     * Responsive font size for note text
     * Clamps between min and max for readability across screen sizes
     */
    FONT_SIZE_RESPONSIVE: 'clamp(7px, 1.1vw, 10px)',

    /**
     * Minimum font size in pixels
     */
    MIN_FONT_SIZE_PX: 7,

    /**
     * Responsive/flexible font size as viewport percentage
     */
    RESPONSIVE_FONT_SIZE_VW: 1.1,

    /**
     * Maximum font size in pixels
     */
    MAX_FONT_SIZE_PX: 10,

    /**
     * Border width for note circles
     */
    BORDER_WIDTH_PX: 1,

    /**
     * Border color with transparency for subtle effect
     */
    BORDER_COLOR: 'rgba(255, 255, 255, 0.2)',

    /**
     * Box shadow for depth effect on notes
     * Creates 3D appearance with two shadow layers
     */
    BOX_SHADOW: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
} as const;

// ============================================================================
// FRET STYLING
// ============================================================================

export const FRET_STYLING = {
    /**
     * Width of fret bars in pixels
     * Represents the metal fret bar thickness
     */
    FRET_WIDTH_PX: 7,

    /**
     * Border radius for fret bars
     * Creates smooth, rounded edges
     */
    FRET_BORDER_RADIUS_PX: 16,
} as const;

// ============================================================================
// STRING STYLING
// ============================================================================

export const STRING_STYLING = {
    /**
     * Thickness of guitar strings in pixels
     */
    STRING_THICKNESS_PX: 2,

    /**
     * Width of strings as percentage of fretboard
     * 99% leaves small margin on edges
     */
    STRING_WIDTH_PERCENT: 99,

    /**
     * Border radius for string ends
     */
    STRING_BORDER_RADIUS_PX: 16,

    /**
     * Shadow beneath strings for depth effect
     */
    STRING_BOX_SHADOW: '0px 2px 4px rgba(0, 0, 0, 0.3)',
} as const;

// ============================================================================
// GUITAR NECK STYLING
// ============================================================================

export const GUITAR_NECK = {
    /**
     * Multiplier for calculating neck height based on number of strings
     * height = numberOfStrings × HEIGHT_PER_STRING_VH
     */
    HEIGHT_PER_STRING_VH: 3.7,

    /**
     * Border radius for rounded neck corners
     */
    BORDER_RADIUS_PX: 8,

    /**
     * Shadow for neck depth effect
     */
    BOX_SHADOW: '0px 4px 8px rgba(0, 0, 0, 0.2)',

    /**
     * Top margin to position neck below controls
     */
    TOP_MARGIN_PX: 100,

    /**
     * Background color (wood texture can be enabled later)
     */
    BACKGROUND_COLOR: 'salmon',

    /**
     * Responsive width breakpoints
     */
    WIDTH: {
        XS: '90%',   // Extra small screens (mobile)
        SM: '75%',   // Small screens (tablet portrait)
        MD: '75%',   // Medium screens (tablet landscape)
        LG: '70%',   // Large screens (laptop)
        XL: '60%',   // Extra large screens (desktop)
        XXL: '50%',  // Ultra-wide screens (>2000px)
    },

    /**
     * Breakpoint for ultra-wide screens
     */
    ULTRA_WIDE_BREAKPOINT_PX: 2000,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate the total vertical offset for fret dot markers
 */
export const getFretDotOffset = (): number => {
    return FRETBOARD_LAYOUT.STRING_OFFSET_PERCENT + FRETBOARD_LAYOUT.FRET_DOT_OFFSET_ADDITION;
};

/**
 * Calculate the vertical offset for note positioning
 */
export const getNoteVerticalOffset = (): number => {
    return FRETBOARD_LAYOUT.STRING_OFFSET_PERCENT - FRETBOARD_LAYOUT.NOTE_VERTICAL_ADJUSTMENT;
};

/**
 * Calculate guitar neck height based on number of strings
 */
export const calculateNeckHeight = (numberOfStrings: number): string => {
    return `${numberOfStrings * GUITAR_NECK.HEIGHT_PER_STRING_VH}vh`;
};