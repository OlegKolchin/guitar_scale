/**
 * Calculates the vertical position (top) for a string on the fretboard
 *
 * @param stringIndex - Zero-based string index (0 = first string)
 * @param numberOfStrings - Total number of strings on the instrument
 * @param offset - Vertical offset percentage to adjust positioning
 * @returns CSS calc string for top position
 *
 * @example
 * calculateStringPosition(0, 6, 6.6)
 * // Returns: "calc(0% + 6.6%)"
 *
 * calculateStringPosition(2, 6, 6.6)
 * // Returns: "calc(33.33% + 6.6%)"
 */
export const calculateStringPosition = (
    stringIndex: number,
    numberOfStrings: number,
    offset: number
): string => {
    const basePosition = stringIndex * (100 / numberOfStrings);
    return `calc(${basePosition}% + ${offset}%)`;
};

/**
 * Calculates the horizontal position (left) for a fret on the fretboard
 *
 * @param fretNo - Fret number (1-based, 1 = first fret)
 * @param numberOfFrets - Total number of frets displayed
 * @returns CSS calc string for left position (centered in fret)
 *
 * @example
 * calculateFretPosition(1, 15)
 * // Returns: "calc(0% + 3.33%)" - First fret, centered
 *
 * calculateFretPosition(5, 15)
 * // Returns: "calc(26.67% + 3.33%)" - Fifth fret, centered
 */
export const calculateFretPosition = (
    fretNo: number,
    numberOfFrets: number
): string => {
    const fretWidth = 100 / numberOfFrets;
    const basePosition = fretWidth * (fretNo - 1);
    const centerOffset = fretWidth / 2;
    return `calc(${basePosition}% + ${centerOffset}%)`;
};

/**
 * Calculates the position for a note on the fretboard grid
 * Combines string and fret positions
 *
 * @param stringNo - String number (1-based)
 * @param fretNo - Fret number (1-based)
 * @param numberOfStrings - Total number of strings
 * @param numberOfFrets - Total number of frets
 * @param stringOffset - Vertical offset for strings
 * @returns Object with top and left CSS calc strings
 *
 * @example
 * calculateNotePosition(1, 5, 6, 15, 6.6)
 * // Returns: { top: "calc(0% + 1.6%)", left: "calc(26.67% + 3.33%)" }
 */
export const calculateNotePosition = (
    stringNo: number,
    fretNo: number,
    numberOfStrings: number,
    numberOfFrets: number,
    stringOffset: number
): { top: string; left: string } => {
    const stringIndex = stringNo - 1; // Convert to zero-based
    const noteOffset = stringOffset - 5; // Adjust offset for note positioning

    const top = calculateStringPosition(stringIndex, numberOfStrings, noteOffset);
    const left = calculateFretPosition(fretNo, numberOfFrets);

    return { top, left };
};

/**
 * Calculates position for fret dot markers (fret numbers below the neck)
 *
 * @param fretNo - Fret number (1-based)
 * @param numberOfFrets - Total number of frets
 * @param dotOffset - Vertical offset in pixels below the fretboard
 * @returns Object with top and left CSS strings
 *
 * @example
 * calculateFretDotPosition(3, 15, 11.6)
 * // Returns: { top: "calc(100% + 11.6px)", left: "calc(13.33% + 3.33%)" }
 */
export const calculateFretDotPosition = (
    fretNo: number,
    numberOfFrets: number,
    dotOffset: number
): { top: string; left: string } => {
    const left = calculateFretPosition(fretNo, numberOfFrets);
    const top = `calc(100% + ${dotOffset}px)`;

    return { top, left };
};

/**
 * Calculates position for open string note labels (left side of fretboard)
 *
 * @param stringIndex - Zero-based string index
 * @param numberOfStrings - Total number of strings
 * @param stringOffset - Vertical offset for strings
 * @param leftOffset - Horizontal offset (negative to position left of fretboard)
 * @returns Object with top and left CSS strings
 *
 * @example
 * calculateOpenStringPosition(0, 6, 6.6, -2)
 * // Returns: { top: "calc(0% + 1.6%)", left: "-2%" }
 */
export const calculateOpenStringPosition = (
    stringIndex: number,
    numberOfStrings: number,
    stringOffset: number,
    leftOffset: number = -2
): { top: string; left: string } => {
    const noteOffset = stringOffset - 5;
    const top = calculateStringPosition(stringIndex, numberOfStrings, noteOffset);
    const left = `${leftOffset}%`;

    return { top, left };
};