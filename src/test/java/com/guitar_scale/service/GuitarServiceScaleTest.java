package com.guitar_scale.service;

import com.guitar_scale.domain.ScaleItem;
import org.junit.jupiter.api.Disabled;
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
 * Scale generation and modal reinterpretation against the real seed data.
 * Expected notes come from music theory (DOMAIN.md "From D" column, TESTING.md reference values).
 */
@SpringBootTest
class GuitarServiceScaleTest {

    @Autowired
    private GuitarService service;

    private static List<String> noteNames(List<ScaleItem> scale) {
        return scale.stream().map(ScaleItem::getNoteName).toList();
    }

    private static List<String> labels(List<ScaleItem> scale) {
        return scale.stream().map(ScaleItem::getScalePos).toList();
    }

    private static List<String> notesWithLabels(List<ScaleItem> scale) {
        return scale.stream().map(item -> item.getNoteName() + "(" + item.getScalePos() + ")").toList();
    }

    // ------------------------------------------------------------------ createScale

    static Stream<Arguments> scalesFromD() {
        return Stream.of(
                arguments("Major", List.of("D", "E", "F#", "G", "A", "B", "C#")),
                arguments("Minor", List.of("D", "E", "F", "G", "A", "A#", "C")),
                arguments("Dorian", List.of("D", "E", "F", "G", "A", "B", "C")),
                arguments("Phrygian", List.of("D", "D#", "F", "G", "A", "A#", "C")),
                arguments("Mixolydian", List.of("D", "E", "F#", "G", "A", "B", "C")),
                arguments("Locrian", List.of("D", "D#", "F", "G", "G#", "A#", "C")),
                arguments("Harmonic Minor", List.of("D", "E", "F", "G", "A", "A#", "C#")),
                arguments("Melodic Minor", List.of("D", "E", "F", "G", "A", "B", "C#")),
                arguments("Pentatonic Major", List.of("D", "E", "F#", "A", "B")),
                arguments("Pentatonic Minor", List.of("D", "F", "G", "A", "C")),
                arguments("Blues", List.of("D", "F", "G", "G#", "A", "C"))
        );
    }

    @ParameterizedTest(name = "D {0}")
    @MethodSource("scalesFromD")
    void createScaleFromDReturnsTheNotesOfTheScale(String patternName, List<String> expectedNotes) {
        assertThat(noteNames(service.createScale("D", patternName))).containsExactlyElementsOf(expectedNotes);
    }

    static Stream<Arguments> degreeLabels() {
        List<String> heptatonic = List.of("1", "2", "3", "4", "5", "6", "7");
        return Stream.of(
                arguments("Major", heptatonic),
                arguments("Minor", heptatonic),
                arguments("Dorian", heptatonic),
                arguments("Phrygian", heptatonic),
                arguments("Mixolydian", heptatonic),
                arguments("Locrian", heptatonic),
                arguments("Harmonic Minor", heptatonic),
                arguments("Melodic Minor", heptatonic),
                arguments("Pentatonic Major", List.of("1", "2", "3", "5", "6")),
                arguments("Pentatonic Minor", List.of("1", "3", "4", "5", "7"))
                // Blues: see bluesLabelsTheFlatFifthBeforeTheFifth (BL-02)
        );
    }

    @ParameterizedTest(name = "D {0}")
    @MethodSource("degreeLabels")
    void createScaleFromDLabelsEachNoteWithItsDegree(String patternName, List<String> expectedLabels) {
        assertThat(labels(service.createScale("D", patternName))).containsExactlyElementsOf(expectedLabels);
    }

    @Test
    @Disabled("BL-02: Blues labels 5 and 5♭ are swapped in data.sql; G# is the flat fifth, A the fifth")
    void bluesLabelsTheFlatFifthBeforeTheFifth() {
        assertThat(notesWithLabels(service.createScale("D", "Blues")))
                .containsExactly("D(1)", "F(3)", "G(4)", "G#(5♭)", "A(5)", "C(7)");
    }

    static Stream<Arguments> scalesWrappingPastB() {
        return Stream.of(
                arguments("A", "Major", List.of("A", "B", "C#", "D", "E", "F#", "G#")),
                arguments("B", "Minor", List.of("B", "C#", "D", "E", "F#", "G", "A")),
                arguments("F", "Melodic Minor", List.of("F", "G", "G#", "A#", "C", "D", "E"))
        );
    }

    @ParameterizedTest(name = "{0} {1}")
    @MethodSource("scalesWrappingPastB")
    void createScaleWrapsAroundPastB(String root, String patternName, List<String> expectedNotes) {
        assertThat(noteNames(service.createScale(root, patternName))).containsExactlyElementsOf(expectedNotes);
    }

    @Test
    void createScaleNamesEveryItemRootSpacePattern() {
        assertThat(service.createScale("A#", "Harmonic Minor"))
                .extracting(ScaleItem::getScaleName)
                .containsOnly("A# Harmonic Minor");
    }

    // ------------------------------------------------------------------ createChordScale

    @Test
    void createChordScaleReRootsDMinorOnGAndRenumbersTheDegrees() {
        assertThat(notesWithLabels(service.createChordScale("D", "Minor", "G")))
                .containsExactly("G(1)", "A(2)", "A#(3)", "C(4)", "D(5)", "E(6)", "F(7)");
    }

    @Test
    void createChordScaleOnTheScaleRootEqualsThePlainScale() {
        assertThat(notesWithLabels(service.createChordScale("D", "Minor", "D")))
                .containsExactlyElementsOf(notesWithLabels(service.createScale("D", "Minor")));
    }

    @Test
    void createChordScaleOnANoteOutsideTheScaleIsEmpty() {
        assertThat(service.createChordScale("D", "Minor", "F#")).isEmpty();
    }

    // ------------------------------------------------------------------ unknown names

    // BL-13: the exact exception type is unspecified today (bare Optional.get()); assert loosely.
    @Test
    void createScaleWithAnUnknownNoteFails() {
        assertThatThrownBy(() -> service.createScale("H", "Minor")).isInstanceOf(RuntimeException.class);
    }

    // BL-13: see above.
    @Test
    void createScaleWithAnUnknownPatternFails() {
        assertThatThrownBy(() -> service.createScale("D", "No Such Scale")).isInstanceOf(RuntimeException.class);
    }
}
