package com.guitar_scale.utils;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.ChordPattern;
import com.guitar_scale.domain.ScaleItem;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ScaleUtil {

    public enum Interval {
        UNISON("Unison", 0),
        MINOR_SECOND("Minor Second", 1),
        MAJOR_SECOND("Major Second", 2),
        MINOR_THIRD("Minor Third", 3),
        MAJOR_THIRD("Major Third", 4),
        PERFECT_FOURTH("Perfect Fourth", 5),
        TRITONE("Tritone", 6),
        PERFECT_FIFTH("Perfect Fifth", 7),
        MINOR_SIXTH("Minor Sixth", 8),
        MAJOR_SIXTH("Major Sixth", 9),
        MINOR_SEVENTH("Minor Seventh", 10),
        MAJOR_SEVENTH("Major Seventh", 11),
        OCTAVE("Octave", 12),
        MINOR_NINTH("Minor Ninth", 13),
        MAJOR_NINTH("Major Ninth", 14),
        MINOR_TENTH("Minor Tenth", 15),
        MAJOR_TENTH("Major Tenth", 16);

        private final String name;
        private final int semitones;

        Interval(String name, int semitones) {
            this.name = name;
            this.semitones = semitones;
        }

        public String getName() {
            return name;
        }

        public int getSemitones() {
            return semitones;
        }

        public static Interval fromSemitones(int semitones) {
            for (Interval interval : values()) {
                if (interval.semitones == semitones) {
                    return interval;
                }
            }
            throw new IllegalArgumentException("No interval found for " + semitones + " semitones");
        }

        public static Interval fromName(String name) {
            for (Interval interval : values()) {
                if (interval.name.equalsIgnoreCase(name)) {
                    return interval;
                }
            }
            throw new IllegalArgumentException("No interval found with name: " + name);
        }
    }

    public static boolean isIntervalInScale(List<ScaleItem> scaleItems,
                                            String intervalName,
                                            BasicNote intervalRootNote,
                                            List<BasicNote> notes) {

        int basicNoteIndex = intervalRootNote.getBasicPos() - 1;
        Interval interval = Interval.fromName(intervalName);
        int intervalLength = interval.getSemitones();
        int destinationIndex = (basicNoteIndex + intervalLength) % 12;

        BasicNote destinationNote = notes.get(destinationIndex);

        for (ScaleItem scaleItem : scaleItems) {
            if (scaleItem.getNoteName().equals(destinationNote.getNoteName())) {
                return true;
            }
        }

        return false;
    }

    public static boolean isChordInScale(List<ScaleItem> scale,
                                         ChordPattern chordPattern,
                                         BasicNote chordRootNote,
                                         List<BasicNote> basicNotes /* Basic notes from C to B*/) {

        Set<String> scaleNotes = scale.stream()
                .map(ScaleItem::getNoteName)
                .collect(Collectors.toSet());

        String[] patternIntervalsArray = chordPattern.getPattern().split("-");

        int basicNoteIndex = chordRootNote.getBasicPos() - 1;
        int destinationIndex = 0;
        int positionIncrement = 0;


        for (String interval : patternIntervalsArray) {
            if ("W".equals(interval)) {
                positionIncrement = 2;
            } else if ("WH".equals(interval)) {
                positionIncrement = 3;
            } else if ("WW".equals(interval)) {
                positionIncrement = 4;
            } else if ("WWH".equals(interval)) {
                positionIncrement = 5;
            }

            destinationIndex = (basicNoteIndex +  positionIncrement) % 12;
            basicNoteIndex = destinationIndex;
            BasicNote destinationNote = basicNotes.get(destinationIndex);

            if (!scaleNotes.contains(destinationNote.getNoteName())) {
                return false;
            }
        }

        return true;
    }
}