package com.guitar_scale.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.params.provider.Arguments.arguments;

/**
 * The scale-aware interval and chord filters against the real seed data.
 * Expected values: TESTING.md "Chord filter, scale D Minor" and "Interval filter, scale D Minor, from E".
 */
@SpringBootTest
class GuitarServiceFilterTest {

    /** All 17 canonical interval names, in semitone order (0..16). */
    static final List<String> ALL_INTERVALS = List.of(
            "Unison", "Minor Second", "Major Second", "Minor Third", "Major Third", "Perfect Fourth",
            "Tritone", "Perfect Fifth", "Minor Sixth", "Major Sixth", "Minor Seventh", "Major Seventh",
            "Octave", "Minor Ninth", "Major Ninth", "Minor Tenth", "Major Tenth");

    @Autowired
    private GuitarService service;

    // ------------------------------------------------------------------ intervals

    @Test
    void filterIntervalsKeepsOnlyIntervalsFromELandingInDMinorInInputOrder() {
        assertThat(service.filterIntervalsForScale("D", "Minor", "E", ALL_INTERVALS)).containsExactly(
                "Unison", "Minor Second", "Minor Third", "Perfect Fourth", "Tritone",
                "Minor Sixth", "Minor Seventh", "Octave", "Minor Ninth", "Minor Tenth");
    }

    @Test
    void filterIntervalsDropsAnUnknownIntervalNameInsteadOfFailing() {
        assertThat(service.filterIntervalsForScale("D", "Minor", "E", List.of("Minor Third", "Fifth", "Major Third")))
                .containsExactly("Minor Third");
    }

    @Test
    void filterIntervalsRejectsAnUnknownClickedNote() {
        assertThatThrownBy(() -> service.filterIntervalsForScale("D", "Minor", "H", ALL_INTERVALS))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void isIntervalInScaleAcceptsMinorThirdFromEInDMinor() {
        assertThat(service.isIntervalInScale("D", "Minor", "Minor Third", "E")).isTrue();
    }

    @Test
    void isIntervalInScaleRejectsMajorThirdFromEInDMinor() {
        assertThat(service.isIntervalInScale("D", "Minor", "Major Third", "E")).isFalse();
    }

    // ------------------------------------------------------------------ chords

    static Stream<Arguments> chordsInDMinor() {
        return Stream.of(
                arguments("D", List.of("Minor Seventh Chord", "Minor Triad", "Suspended Fourth Chord", "Suspended Second Chord")),
                arguments("F", List.of("Major Seventh Chord", "Major Triad", "Suspended Fourth Chord", "Suspended Second Chord")),
                arguments("G", List.of("Minor Seventh Chord", "Minor Triad", "Suspended Fourth Chord", "Suspended Second Chord")),
                arguments("A", List.of("Minor Seventh Chord", "Minor Triad", "Suspended Fourth Chord")),
                arguments("A#", List.of("Major Seventh Chord", "Major Triad", "Suspended Second Chord")),
                arguments("C", List.of("Dominant Seventh Chord", "Major Triad", "Suspended Fourth Chord", "Suspended Second Chord"))
        );
    }

    @ParameterizedTest(name = "D Minor, chord root {0}")
    @MethodSource("chordsInDMinor")
    void filterChordsReturnsTheChordsWhoseEveryToneIsInDMinor(String chordRoot, List<String> expected) {
        assertThat(service.filterChordsForScale("D", "Minor", chordRoot))
                .containsExactlyInAnyOrderElementsOf(expected);
    }

    @Test
    void filterChordsOnEInDMinorOffersDiminishedTriadAndHalfDiminishedSeventh() {
        assertThat(service.filterChordsForScale("D", "Minor", "E"))
                .containsExactlyInAnyOrder("Diminished Triad", "Half-Diminished Seventh Chord");
    }

    @Test
    void filterChordsOnEInDMelodicMinor() {
        assertThat(service.filterChordsForScale("D", "Melodic Minor", "E"))
                .containsExactlyInAnyOrder("Minor Seventh Chord", "Minor Triad", "Suspended Fourth Chord");
    }
}
