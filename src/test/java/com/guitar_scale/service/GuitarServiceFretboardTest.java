package com.guitar_scale.service;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.DefaultSettings;
import com.guitar_scale.domain.Fret;
import com.guitar_scale.domain.TuningItem;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.params.provider.Arguments.arguments;

/**
 * Fretboard generation, chord voicing on the fretboard, tunings and the startup profile.
 * Pitch identity: absolutePos = (octave - 1) * 12 + basicPos, C = 1 ... B = 12 (DOMAIN.md).
 */
@SpringBootTest
class GuitarServiceFretboardTest {

    private static final List<String> NOTE_NAMES =
            List.of("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");

    private static final List<String> ALL_TUNINGS = List.of(
            "E STANDARD", "D STANDARD", "DROP D", "DROP C", "DROP B", "DROP G", "DROP A",
            "DROP A7", "B STANDARD7", "C STANDARD7", "DROP G7");

    @Autowired
    private GuitarService service;

    private static int absolutePos(String noteName, int octave) {
        return (octave - 1) * 12 + NOTE_NAMES.indexOf(noteName) + 1;
    }

    // ------------------------------------------------------------------ E STANDARD shape

    @Test
    void eStandardHasSixStringsKeyedOneToSix() {
        assertThat(service.getFretBoardNew("E STANDARD").getFrets()).containsOnlyKeys(1, 2, 3, 4, 5, 6);
    }

    @Test
    void eStandardHasFifteenFretsPerStringNumberedOneToFifteenInOrder() {
        service.getFretBoardNew("E STANDARD").getFrets().forEach((string, frets) ->
                assertThat(frets).as("string %d", string)
                        .extracting(Fret::getFretNo)
                        .containsExactlyElementsOf(IntStream.rangeClosed(1, 15).boxed().toList()));
    }

    @Test
    void eStandardFretsCarryTheStringNumberOfTheirMapKey() {
        service.getFretBoardNew("E STANDARD").getFrets().forEach((string, frets) ->
                assertThat(frets).as("string %d", string)
                        .extracting(Fret::getStringNo)
                        .containsOnly(string));
    }

    @ParameterizedTest(name = "string {0}, fret {1} is {2}{3} ({4})")
    @CsvSource({
            "1,  1, F, 4, 42",
            "1, 15, G, 5, 56",
            "2,  1, C, 4, 37",   // B3 -> C4: the octave changes here
            "2, 15, D, 5, 51",
            "6,  1, F, 2, 18",
            "6, 15, G, 3, 32",
    })
    void eStandardReferencePitches(int string, int fretNo, String noteName, int octave, int absolutePos) {
        BasicNote note = service.getFretBoardNew("E STANDARD").getFrets().get(string).get(fretNo - 1).getNote();
        assertThat(note.getNoteName()).isEqualTo(noteName);
        assertThat(note.getOctave()).isEqualTo(octave);
        assertThat(note.getAbsolutePos()).isEqualTo(absolutePos);
    }

    // ------------------------------------------------------------------ every tuning

    @ParameterizedTest(name = "{0}")
    @MethodSource("tuningNames")
    void everyStringStartsOneSemitoneAboveTheOpenStringAndRisesBySemitones(String tuningName) {
        List<TuningItem> tuning = service.getTuningItemByName(tuningName);
        Map<Integer, List<Fret>> frets = service.getFretBoardNew(tuningName).getFrets();

        assertThat(frets).hasSize(tuning.size());
        for (int i = 0; i < tuning.size(); i++) {
            TuningItem open = tuning.get(i);
            List<Fret> string = frets.get(i + 1);
            int expected = absolutePos(open.getNoteName(), open.getOctave()) + 1;
            for (Fret fret : string) {
                BasicNote note = fret.getNote();
                assertThat(note.getAbsolutePos())
                        .as("%s string %d fret %d", tuningName, i + 1, fret.getFretNo())
                        .isEqualTo(expected++);
                assertThat(note.getAbsolutePos())
                        .as("%s string %d fret %d: absolutePos matches name and octave", tuningName, i + 1, fret.getFretNo())
                        .isEqualTo(absolutePos(note.getNoteName(), note.getOctave()));
            }
        }
    }

    static Stream<String> tuningNames() {
        return ALL_TUNINGS.stream();
    }

    @Test
    void bStandard7HasSevenStringsAndTheLowBStringRunsFromC2ToD3() {
        Map<Integer, List<Fret>> frets = service.getFretBoardNew("B STANDARD7").getFrets();
        assertThat(frets).hasSize(7);

        BasicNote first = frets.get(7).get(0).getNote();
        BasicNote last = frets.get(7).get(14).getNote();
        assertThat(first.getNoteName() + first.getOctave()).isEqualTo("C2");
        assertThat(first.getAbsolutePos()).isEqualTo(13);
        assertThat(last.getNoteName() + last.getOctave()).isEqualTo("D3");
        assertThat(last.getAbsolutePos()).isEqualTo(27);
    }

    // ------------------------------------------------------------------ calculateChordNotes

    static Stream<Arguments> chordsOnEStandard() {
        return Stream.of(
                arguments(27, "Minor Triad", List.of(27, 30, 34)),              // D3 F3 A3
                arguments(37, "Major Seventh Chord", List.of(37, 41, 44, 48)),  // C4 E4 G4 B4
                arguments(54, "Major Triad", List.of(54))                       // F5; A5 (58) and C6 (61) are above 56
        );
    }

    @ParameterizedTest(name = "{1} on {0}")
    @MethodSource("chordsOnEStandard")
    void calculateChordNotesVoicesTheChordUpwardsWithinTheFretboard(int root, String chord, List<Integer> expected) {
        assertThat(service.calculateChordNotes(root, chord, "E STANDARD"))
                .extracting(BasicNote::getAbsolutePos)
                .containsExactlyElementsOf(expected);
    }

    @Test
    @Disabled("BL-29: after a skipped out-of-range tone the next step is added to the last kept note; E5 Major Triad returns 53 and 56 (G5)")
    void calculateChordNotesNeverAddsANoteOutsideTheChordAfterASkippedTone() {
        // E5 (53) Major Triad: G#5 (57) and B5 (60) are above the top of the fretboard (56).
        // G5 (56) must not appear: G is not in E major.
        assertThat(service.calculateChordNotes(53, "Major Triad", "E STANDARD"))
                .extracting(BasicNote::getAbsolutePos)
                .containsExactly(53);
    }

    // ------------------------------------------------------------------ tunings and defaults

    @Test
    void getAllSavedTuningsReturnsTheElevenSeedTunings() {
        assertThat(service.getAllSavedTunings()).containsOnlyKeys(ALL_TUNINGS.toArray(String[]::new));
    }

    @Test
    void getTuningItemByNameIsOrderedByStringNumberStartingWithE4() {
        List<TuningItem> tuning = service.getTuningItemByName("E STANDARD");
        assertThat(tuning).extracting(TuningItem::getStringNo).containsExactly(1, 2, 3, 4, 5, 6);
        assertThat(tuning.get(0).getNoteName()).isEqualTo("E");
        assertThat(tuning.get(0).getOctave()).isEqualTo(4);
    }

    @Test
    void defaultSettingsAreEStandardSixStringsDMinor() {
        DefaultSettings settings = service.getDefaultSettings();
        assertThat(settings.getTuningName()).isEqualTo("E STANDARD");
        assertThat(settings.getNumberOfStrings()).isEqualTo(6);
        assertThat(settings.getCoreNoteName()).isEqualTo("D");
        assertThat(settings.getPatternName()).isEqualTo("Minor");
    }
}
