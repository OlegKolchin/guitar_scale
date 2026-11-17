package com.guitar_scale;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.ChordPattern;
import com.guitar_scale.domain.DefaultSettings;
import com.guitar_scale.domain.ScalePattern;
import com.guitar_scale.domain.TuningItem;
import com.guitar_scale.repository.BasicNoteRepository;
import com.guitar_scale.repository.ChordPatternRepository;
import com.guitar_scale.repository.DefaultSettingsRepository;
import com.guitar_scale.repository.ScalePatternRepository;
import com.guitar_scale.repository.TuningItemRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Invariants of the seed data in data.sql, read through the repositories (TESTING.md
 * "Seed-data invariants"). One test method per invariant.
 * <p>
 * The step-token table below deliberately duplicates the production parsing: these tests must not
 * depend on the code they will later guard (BL-09).
 */
@SpringBootTest
class SeedDataTest {

    private static final Map<String, Integer> TOKEN_SEMITONES =
            Map.of("H", 1, "W", 2, "WH", 3, "WW", 4, "WWH", 5);

    private static final List<String> NOTE_NAMES =
            List.of("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");

    /** Tunings with known seed-data problems, tested separately (BL-03). */
    private static final Set<String> SUSPECT_TUNINGS = Set.of("DROP A", "DROP G");

    /** Largest interval between adjacent open strings in any real tuning: a perfect fifth (drop tunings). */
    private static final int MAX_ADJACENT_STRING_INTERVAL = 7;

    @Autowired private BasicNoteRepository basicNoteRepository;
    @Autowired private ScalePatternRepository scalePatternRepository;
    @Autowired private ChordPatternRepository chordPatternRepository;
    @Autowired private TuningItemRepository tuningItemRepository;
    @Autowired private DefaultSettingsRepository defaultSettingsRepository;

    private static <T> List<T> all(Iterable<T> rows) {
        return StreamSupport.stream(rows.spliterator(), false).toList();
    }

    private static List<String> tokens(String pattern) {
        return List.of(pattern.split("-"));
    }

    private static int semitones(String token) {
        return TOKEN_SEMITONES.get(token);
    }

    private static int pitch(TuningItem item) {
        return (item.getOctave() - 1) * 12 + NOTE_NAMES.indexOf(item.getNoteName()) + 1;
    }

    /** Ordering key for a degree label: "5♭" sorts just below "5", "5#" just above. */
    private static int degreeKey(String label) {
        int number = Integer.parseInt(label.replaceAll("[^0-9]", ""));
        int alteration = label.contains("♭") || label.contains("b") ? -1 : label.contains("#") ? 1 : 0;
        return number * 3 + alteration;
    }

    private Map<String, List<TuningItem>> tuningsByName() {
        Map<String, List<TuningItem>> byName = new TreeMap<>();
        for (TuningItem item : all(tuningItemRepository.findAll())) {
            byName.computeIfAbsent(item.getTuningName(), k -> new ArrayList<>()).add(item);
        }
        byName.values().forEach(strings -> strings.sort((a, b) -> a.getStringNo() - b.getStringNo()));
        return byName;
    }

    // ------------------------------------------------------------------ scales

    @Test
    void everyScaleStepTokenIsKnown() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            assertThat(tokens(scale.getPattern())).as(scale.getPatterName()).isSubsetOf(TOKEN_SEMITONES.keySet());
        }
    }

    @Test
    void everyScaleSpansLessThanAnOctave() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            int total = tokens(scale.getPattern()).stream().mapToInt(SeedDataTest::semitones).sum();
            assertThat(total).as(scale.getPatterName()).isLessThan(12);
        }
    }

    @Test
    void everyScaleHasExactlyOneDegreeLabelPerNote() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            int labels = scale.getStepSequence().split("\\|").length;
            assertThat(labels).as(scale.getPatterName()).isEqualTo(tokens(scale.getPattern()).size() + 1);
        }
    }

    @Test
    void noScaleRepeatsANote() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            List<Integer> pitchClasses = new ArrayList<>(List.of(0));
            for (String token : tokens(scale.getPattern())) {
                pitchClasses.add((pitchClasses.get(pitchClasses.size() - 1) + semitones(token)) % 12);
            }
            assertThat(pitchClasses).as(scale.getPatterName()).doesNotHaveDuplicates();
        }
    }

    @Test
    void scaleDegreeLabelsAscend() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            List<Integer> keys = Arrays.stream(scale.getStepSequence().split("\\|"))
                    .map(SeedDataTest::degreeKey).toList();
            assertThat(keys).as(scale.getPatterName() + " " + scale.getStepSequence()).isSorted().doesNotHaveDuplicates();
        }
    }

    @Test
    void degreeLabelsAreDigitsWithAnOptionalFlatOrSharp() {
        for (ScalePattern scale : all(scalePatternRepository.findAll())) {
            for (String label : scale.getStepSequence().split("\\|")) {
                assertThat(label).as(scale.getPatterName()).matches("[♭#]?[0-9]+[♭#]?");
            }
        }
    }

    // ------------------------------------------------------------------ chords

    @Test
    void everyChordStepTokenIsKnown() {
        for (ChordPattern chord : all(chordPatternRepository.findAll())) {
            assertThat(tokens(chord.getPattern())).as(chord.getPatterName()).isSubsetOf(TOKEN_SEMITONES.keySet());
        }
    }

    @Test
    void noTwoChordsShareAPattern() {
        List<String> patterns = all(chordPatternRepository.findAll()).stream().map(ChordPattern::getPattern).toList();
        assertThat(patterns).doesNotHaveDuplicates();
    }

    // ------------------------------------------------------------------ tunings

    @Test
    void stringNumbersRunFromOneWithoutGaps() {
        tuningsByName().forEach((name, strings) ->
                assertThat(strings).as(name).extracting(TuningItem::getStringNo)
                        .containsExactlyElementsOf(IntStream.rangeClosed(1, strings.size()).boxed().toList()));
    }

    @Test
    void everyTuningNoteExistsInBasicNote() {
        Set<String> notes = all(basicNoteRepository.findAll()).stream()
                .map(BasicNote::getNoteName).collect(Collectors.toSet());
        tuningsByName().forEach((name, strings) ->
                assertThat(strings).as(name).extracting(TuningItem::getNoteName).allMatch(notes::contains));
    }

    @Test
    void pitchStrictlyDescendsFromStringOneToTheLastString() {
        tuningsByName().forEach((name, strings) -> {
            if (!SUSPECT_TUNINGS.contains(name)) {
                assertThat(strings.stream().map(SeedDataTest::pitch).toList()).as(name)
                        .isSortedAccordingTo((a, b) -> b - a).doesNotHaveDuplicates();
            }
        });
    }

    @Test
    void adjacentOpenStringsAreAtMostAPerfectFifthApart() {
        // Not in the original TESTING.md list: added because DROP G passes the descending check
        // above while its string 1 is 17 semitones above string 2 (BL-03).
        tuningsByName().forEach((name, strings) -> {
            if (!SUSPECT_TUNINGS.contains(name)) {
                for (int i = 1; i < strings.size(); i++) {
                    assertThat(Math.abs(pitch(strings.get(i - 1)) - pitch(strings.get(i))))
                            .as("%s strings %d-%d", name, i, i + 1)
                            .isLessThanOrEqualTo(MAX_ADJACENT_STRING_INTERVAL);
                }
            }
        });
    }

    @Test
    @Disabled("BL-03: DROP A strings are in reverse order and DROP G string 1 is an octave too high; owner to confirm the notes")
    void dropAAndDropGDescendInPitchWithAtMostAFifthBetweenStrings() {
        Map<String, List<TuningItem>> tunings = tuningsByName();
        for (String name : SUSPECT_TUNINGS) {
            List<TuningItem> strings = tunings.get(name);
            for (int i = 1; i < strings.size(); i++) {
                int interval = pitch(strings.get(i - 1)) - pitch(strings.get(i));
                assertThat(interval).as("%s strings %d-%d", name, i, i + 1)
                        .isBetween(1, MAX_ADJACENT_STRING_INTERVAL);
            }
        }
    }

    // ------------------------------------------------------------------ defaults

    @Test
    void defaultSettingsReferToAnExistingTuningNoteAndScale() {
        Set<String> tunings = new HashSet<>(tuningsByName().keySet());
        for (DefaultSettings settings : all(defaultSettingsRepository.findAll())) {
            assertThat(tunings).as("tuning").contains(settings.getTuningName());
            assertThat(basicNoteRepository.findById(settings.getCoreNoteName())).as("note").isPresent();
            assertThat(scalePatternRepository.findById(settings.getPatternName())).as("scale").isPresent();
        }
    }
}
