package com.guitar_scale.service;

import com.guitar_scale.domain.*;
import com.guitar_scale.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class GuitarService {

    private static final Logger logger = LoggerFactory.getLogger(GuitarService.class);

    private final BasicNoteRepository basicNoteRepository;
    private final DefaultSettingsRepository defaultSettingsRepository;
    private final ScalePatternRepository scalePatternRepository;
    private final TuningItemRepository tuningItemRepository;
    private final ChordPatternRepository chordPatternRepository;

    public GuitarService(BasicNoteRepository basicNoteRepository, DefaultSettingsRepository defaultSettingsRepository, ScalePatternRepository scalePatternRepository, TuningItemRepository tuningItemRepository, ChordPatternRepository chordPatternRepository) {
        this.basicNoteRepository = basicNoteRepository;
        this.defaultSettingsRepository = defaultSettingsRepository;
        this.scalePatternRepository = scalePatternRepository;
        this.tuningItemRepository = tuningItemRepository;
        this.chordPatternRepository = chordPatternRepository;
    }

    public List<BasicNote> getAllBasicNotes() {
        List<BasicNote> basicNotes = new ArrayList<>();
        basicNoteRepository.findAll().forEach(basicNotes::add);
        return basicNotes;
    }

    public Optional<BasicNote> getBasicNoteByName(String noteName) {
        return basicNoteRepository.findById(noteName);
    }


    public List<TuningItem> getTuningItemByName(String tuningName) {
        return tuningItemRepository.getTuningItemByTuningNameOrderByStringNo(tuningName);
    }

    public Map<String, List<TuningItem>> getAllSavedTunings() {
        List<TuningItem> allTunings = tuningItemRepository.getAllOrdered();
        return allTunings.stream()
                .collect(Collectors.groupingBy(TuningItem::getTuningName));
    }


    public FretBoard getFretBoardNew(String tuningName) {
        List<TuningItem> tuning = getTuningItemByName(tuningName);
        FretBoard fretBoard =  new FretBoard();
        HashMap<Integer, List<Fret>>  frets = new HashMap<>();

        List<BasicNote> basicNotes = getAllBasicNotes();

        for (int i = 0; i < tuning.size(); i++) {
            int openStringNoteBasicPos = getBasicNoteByName(tuning.get(i).getNoteName()).get().getBasicPos();
            List<Fret> tunedString = tuneStringNew(tuning.get(i), openStringNoteBasicPos, basicNotes);
            frets.put(i + 1, tunedString);
        }

        fretBoard.setFrets(frets);

        return fretBoard;
    }

    private BasicNote getBasicNoteByAbsolutePosition(FretBoard fretBoard, int position) {
        fretBoard.getFrets();
        for (int i = 1; i <= fretBoard.getFrets().size(); i++) {
            for (int j = 0; j < fretBoard.getFrets().get(i).size(); j++) {
                BasicNote note = fretBoard.getFrets().get(i).get(j).getNote();
                if (note.getAbsolutePos() == position) {
                    return note;
                }
            }
        }

        return null;

    }

    private List<Fret> tuneStringNew(TuningItem openString, Integer openStringNoteBasicPos, List<BasicNote> basicNotes) {
        List<Fret> tunedString = new ArrayList<>();

        Fret firstFret = new Fret();
        firstFret.setStringNo(openString.getStringNo());
        firstFret.setFretNo(1);
        BasicNote firstFretNote = new BasicNote();
        firstFretNote.setNoteName(openStringNoteBasicPos == 12 ? basicNotes.get(0).getNoteName() : basicNotes.get(openStringNoteBasicPos).getNoteName());
        firstFretNote.setBasicPos(openStringNoteBasicPos == 12 ? basicNotes.get(0).getBasicPos() : basicNotes.get(openStringNoteBasicPos).getBasicPos());
        firstFretNote.setOctave(openString.getNoteName().equals("B") ? openString.getOctave() + 1 : openString.getOctave());
        firstFretNote.updateAbsolutePos();
        firstFret.setNote(firstFretNote);
        tunedString.add(firstFret);

        int prevNoteBasicPos = firstFretNote.getBasicPos();
        int currentOctave = firstFretNote.getOctave();

        for (int i = 2; i < 16; i++) {
            Fret fret = new Fret();
            fret.setStringNo(openString.getStringNo());
            fret.setFretNo(i);
            BasicNote currentNote = new BasicNote();

            if (prevNoteBasicPos == 12) {
                currentNote.setNoteName(basicNotes.get(0).getNoteName());
                currentNote.setBasicPos(basicNotes.get(0).getBasicPos());
                currentNote.setOctave(++currentOctave);
                currentNote.updateAbsolutePos();
                prevNoteBasicPos = 1;
            } else {
                currentNote.setNoteName(basicNotes.get(prevNoteBasicPos).getNoteName());
                currentNote.setBasicPos(basicNotes.get(prevNoteBasicPos).getBasicPos());
                currentNote.setOctave(currentOctave);
                currentNote.updateAbsolutePos();
                prevNoteBasicPos++;
            }
            fret.setNote(currentNote);
            tunedString.add(fret);
        }

        return tunedString;
    }


    private List<Fret> tuneString(Integer notePos, Integer stringNo) {
        List<Fret> frets = new ArrayList<>();
        Map<Integer, BasicNote> basicNotes = getAllBasicNotes()
                .stream()
                .collect(Collectors.toMap(bn -> bn.getBasicPos(), Function.identity()));
        for (int i = 0; i < 16; i++) {
            Fret fret = new Fret();
            fret.setStringNo(stringNo);
            fret.setNote(basicNotes.get(notePos));
            fret.setFretNo(i);
            notePos = notePos != 12 ? notePos + 1 : 1;
            frets.add(fret);
        }
        return frets;
    }

    public DefaultSettings getDefaultSettings() {
        return defaultSettingsRepository.findAll().iterator().next();
    }

    public ScalePattern getScalePatternByName(String name) {
        return scalePatternRepository.findById(name).get();
    }

    public List<ScaleItem> createScale(String noteName, String patternName) {
        List<BasicNote> basicNotes = getAllBasicNotes();
        basicNotes.addAll(getAllBasicNotes());
        int coreNoteBasicListPosition = getBasicNoteByName(noteName).get().getBasicPos() - 1;

        ScalePattern pattern = getScalePatternByName(patternName);
        List<String> stepSequence = List.of(pattern.getStepSequence().split("\\|"));
        List<String> patternIntervals = List.of(pattern.getPattern().split("-"));

        String scaleName = noteName + " " + patternName;

        List<ScaleItem> rsl = new ArrayList<>();
        int scalePosIndex = 0;
        ScaleItem coreNote = new ScaleItem();
        coreNote.setNoteName(noteName);
        coreNote.setScalePos(stepSequence.get(scalePosIndex++));
        coreNote.setScaleName(scaleName);
        rsl.add(coreNote);

        for (String interval : patternIntervals) {
            ScaleItem scaleItem = new ScaleItem();
            scaleItem.setScaleName(scaleName);
            scaleItem.setScalePos(stepSequence.get(scalePosIndex++));

            if (interval.equals("W")) {
                coreNoteBasicListPosition = coreNoteBasicListPosition + 2;
            } else if (interval.equals("H")) {
                coreNoteBasicListPosition = coreNoteBasicListPosition + 1;
            } else if (interval.equals("WH")) {
                coreNoteBasicListPosition = coreNoteBasicListPosition + 3;
            }

            scaleItem.setNoteName(basicNotes.get(coreNoteBasicListPosition).getNoteName());
            rsl.add(scaleItem);
        }

        return rsl;
    }

    public List<ScaleItem> createChordScale(String noteName, String patternName, String chordRootNote) {
        List<ScaleItem> rsl = new ArrayList<>();
        List<ScaleItem> doubleList = new ArrayList<>();
        doubleList.addAll(createScale(noteName, patternName));
        ScalePattern pattern = getScalePatternByName(patternName);
        List<String> stepSequence = List.of(pattern.getStepSequence().split("\\|"));
        doubleList.addAll(doubleList);

        int scalePosIndex = 0;
        for (ScaleItem item : doubleList) {
            if (rsl.size() == stepSequence.size()) {
                break;
            }
            if (rsl.isEmpty() && item.getNoteName().equals(chordRootNote)) {
                item.setScalePos(stepSequence.get(scalePosIndex++));
                rsl.add(item);
            } else if (!rsl.isEmpty()) {
                item.setScalePos(stepSequence.get(scalePosIndex++));
                rsl.add(item);
            }
        }

        return rsl;
    }

    public List<ChordPattern> getAllChordPatterns() {
        List<ChordPattern> rsl;
        rsl =chordPatternRepository.getAllOrdered();
        return rsl;
    }

    public ChordPattern getChordPatternByName(String name) {
        return chordPatternRepository.findById(name).get();
    }

    public List<BasicNote> calculateChordNotes(int noteAbsolutePosition, String patternName, String currentTuningName) {
        ChordPattern chordPattern = getChordPatternByName(patternName);
        List<BasicNote> rsl = new ArrayList<>();


        String pattern = chordPattern.getPattern();
        String[] patternIntervalsArray = pattern.split("-");

        FretBoard fretBoard = getFretBoardNew(currentTuningName);

        List<Fret> firstString = fretBoard.getFrets().get(1);
        List<Fret> lowestString = fretBoard.getFrets().get(fretBoard.getFrets().size());

        int lowestAbsolutePosition = lowestString.get(0).getNote().getAbsolutePos();
        int highestAbsolutePosition = firstString.get(14).getNote().getAbsolutePos();

        BasicNote coreChordNote = getBasicNoteByAbsolutePosition(fretBoard, noteAbsolutePosition);
        rsl.add(coreChordNote);

        BasicNote prevChordNote = coreChordNote;
        for (String interval : patternIntervalsArray) {

            int positionIncrement = 0;

            if ("W".equals(interval)) {
                positionIncrement = 2;
            } else if ("WH".equals(interval)) {
                positionIncrement = 3;
            } else if ("WW".equals(interval)) {
                positionIncrement = 4;
            }

            int calculatedAbsolutePosition = prevChordNote.getAbsolutePos() + positionIncrement;

            if (calculatedAbsolutePosition < lowestAbsolutePosition ||  calculatedAbsolutePosition > highestAbsolutePosition) {
                continue;
            }

            BasicNote chordNote = getBasicNoteByAbsolutePosition(fretBoard, prevChordNote.getAbsolutePos()+ positionIncrement);
            rsl.add(chordNote);

            prevChordNote = chordNote;
        }




        return rsl;
    }

//    public List<ScaleTemp> createScale(String noteName, String patternName, String scaleName) {
//        List<BasicNote> basicNotes = getAllBasicNotes();
//        basicNotes.addAll(getAllBasicNotes());
//        int coreNoteBasicListPosition = getBasicNoteByName(noteName).get().getBasicPos() - 1;
//        List<String> steps = List.of(patternName.split("-"));
//
//        List<ScaleTemp> rsl = new ArrayList<>();
//        int scalePos = 1;
//        ScaleTemp coreNote = new ScaleTemp();
//        coreNote.setNoteName(noteName);
//        coreNote.setScalePos(scalePos++);
//        coreNote.setScaleName(scaleName);
//        rsl.add(coreNote);
//
//
//        for (String step : steps) {
//            ScaleTemp scaleTemp = new ScaleTemp();
//            scaleTemp.setScaleName(scaleName);
//            scaleTemp.setScalePos(scalePos++);
//            if (step.equals("W")) {
//                coreNoteBasicListPosition = coreNoteBasicListPosition + 2;
//            } else if (step.equals("H")) {
//                coreNoteBasicListPosition = coreNoteBasicListPosition + 1;
//            } else if (step.equals("WH")) {
//                coreNoteBasicListPosition = coreNoteBasicListPosition + 3;
//            }
//            scaleTemp.setNoteName(basicNotes.get(coreNoteBasicListPosition).getNoteName());
//            rsl.add(scaleTemp);
//        }
//
//        return rsl;
//    }


//    public void saveTune(ArrayList<Tune> tune) {
//        tuneRepository.saveAll(tune);
//    }
//
//    public List<Tune> getTuneByName(String name) {
//        return tuneRepository.getTuneByTuneName(name);
//    }


}
