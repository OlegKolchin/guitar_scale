package com.guitar_scale.utils;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.ChordPattern;
import com.guitar_scale.domain.ScaleItem;
import com.guitar_scale.utils.ScaleUtil.Interval;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Plain JUnit tests for the static music math in {@link ScaleUtil}. No Spring, no database:
 * notes, scales and chord patterns are built by hand.
 */
class ScaleUtilTest {

    private static final List<String> NOTE_NAMES =
            List.of("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");

    /** The twelve notes from C to B with basicPos 1..12, as ScaleUtil expects them. */
    private static final List<BasicNote> NOTES = IntStream.range(0, NOTE_NAMES.size())
            .mapToObj(i -> new BasicNote(NOTE_NAMES.get(i), i + 1, null, null))
            .toList();

    private static final List<ScaleItem> D_MINOR = scale("D Minor", "D", "E", "F", "G", "A", "A#", "C");

    private static BasicNote note(String name) {
        return NOTES.get(NOTE_NAMES.indexOf(name));
    }

    private static List<ScaleItem> scale(String scaleName, String... noteNames) {
        return Arrays.stream(noteNames).map(name -> {
            ScaleItem item = new ScaleItem();
            item.setScaleName(scaleName);
            item.setNoteName(name);
            return item;
        }).toList();
    }

    private static ChordPattern chord(String name, String pattern) {
        ChordPattern chordPattern = new ChordPattern();
        chordPattern.setPatterName(name);
        chordPattern.setPattern(pattern);
        return chordPattern;
    }

    // ------------------------------------------------------------------ Interval enum

    @Test
    void intervalEnumHasSeventeenConstantsCoveringZeroToSixteenSemitonesOnce() {
        assertThat(Interval.values()).hasSize(17);
        assertThat(Arrays.stream(Interval.values()).map(Interval::getSemitones))
                .containsExactlyInAnyOrderElementsOf(IntStream.rangeClosed(0, 16).boxed().toList());
    }

    @ParameterizedTest
    @CsvSource({"perfect fifth", "Perfect Fifth", "PERFECT FIFTH"})
    void intervalFromNameIsCaseInsensitive(String name) {
        assertThat(Interval.fromName(name)).isEqualTo(Interval.PERFECT_FIFTH);
    }

    @Test
    void intervalFromNameRejectsAnUnknownName() {
        assertThatThrownBy(() -> Interval.fromName("Fifth"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void intervalFromSemitonesFindsThePerfectFifth() {
        assertThat(Interval.fromSemitones(7)).isEqualTo(Interval.PERFECT_FIFTH);
    }

    @Test
    void intervalFromSemitonesRejectsSeventeen() {
        assertThatThrownBy(() -> Interval.fromSemitones(17))
                .isInstanceOf(IllegalArgumentException.class);
    }

    // ------------------------------------------------------------------ isIntervalInScale

    @ParameterizedTest(name = "D Minor, from E: {0} -> {1}")
    @CsvSource({
            "Minor Third, true",   // E -> G
            "Major Third, false",  // E -> G#
            "Octave,      true",   // E -> E
            "Major Tenth, false",  // E -> G# (16 semitones)
            "Tritone,     true",   // E -> A#
    })
    void isIntervalInScaleChecksTheDestinationNoteAgainstDMinor(String intervalName, boolean expected) {
        assertThat(ScaleUtil.isIntervalInScale(D_MINOR, intervalName, note("E"), NOTES)).isEqualTo(expected);
    }

    // ------------------------------------------------------------------ isChordInScale

    @ParameterizedTest(name = "D Minor: {0} on {2} -> {3}")
    @CsvSource({
            "Minor Triad,            WH-WW,    D, true",   // D F A
            "Major Triad,            WW-WH,    D, false",  // D F# A
            "Diminished Triad,       WH-WH,    E, true",   // E G A#
            "Major Seventh Chord,    WW-WH-WW, F, true",   // F A C E
            "Dominant Seventh Chord, WW-WH-WH, C, true",   // C E G A#
            "Dominant Seventh Chord, WW-WH-WH, F, false",  // F A C D#
            "Augmented Triad,        WW-WW,    C#, false", // C# F A: root not in D Minor (BL-40)
            "Diminished Triad,       WH-WH,    C#, false", // C# E G: root not in D Minor (BL-40)
    })
    void isChordInScaleRequiresEveryChordToneInDMinor(String chordName, String pattern, String root, boolean expected) {
        assertThat(ScaleUtil.isChordInScale(D_MINOR, chord(chordName, pattern), note(root), NOTES))
                .isEqualTo(expected);
    }
}
