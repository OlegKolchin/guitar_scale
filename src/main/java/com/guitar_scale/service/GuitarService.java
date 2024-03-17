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
    private final TuningRepository tuningRepository;
    private final ScaleRepository scaleRepository;
    private final DefaultSettingsRepository defaultSettingsRepository;
    private final ScalePatternRepository scalePatternRepository;
//    private final NotesRepository notesRepository;
//    private final ScaleRepository scaleRepository;
//    private final TuneRepository tuneRepository;

    public GuitarService(BasicNoteRepository basicNoteRepository, TuningRepository tuningRepository, ScaleRepository scaleRepository, DefaultSettingsRepository defaultSettingsRepository, ScalePatternRepository scalePatternRepository) {
        this.basicNoteRepository = basicNoteRepository;
//        this.notesRepository = notesRepository;
//        this.scaleRepository = scaleRepository;
//        this.tuneRepository = tuneRepository;
        this.tuningRepository = tuningRepository;
        this.scaleRepository = scaleRepository;
        this.defaultSettingsRepository = defaultSettingsRepository;
        this.scalePatternRepository = scalePatternRepository;
    }

    public List<BasicNote> getAllBasicNotes() {
        List<BasicNote> basicNotes = new ArrayList<>();
        basicNoteRepository.findAll().forEach(basicNotes::add);
        return basicNotes;
    }

    public Optional<BasicNote> getBasicNoteByName(String noteName) {
        return basicNoteRepository.findById(noteName);
    }

    public List<Tuning> getAllTuning() {
        List<Tuning> tunings = new ArrayList<>();
        tuningRepository.findAll().forEach(tunings::add);
        return tunings;
    }

    public Tuning getTuningByName(String tuningName) {
        return tuningRepository.findById(tuningName).get();
    }

    public void saveTuning(Tuning tuning) {
        tuningRepository.save(tuning);
    }

    public List<Scale> getAllScales() {
        List<Scale> scales = new ArrayList<>();
        scaleRepository.findAll().forEach(scales::add);
        return scales;
    }

    public Scale getScaleByName(String name) {
        return scaleRepository.findById(name).get();
    }

    public void saveScale(Scale scale) {
        scaleRepository.save(scale);
    }

    public FretBoard getFretBoard(String tuningName) {
        Tuning tuning = getTuningByName(tuningName);
        FretBoard fretBoard = new FretBoard();
        HashMap<Integer, List<Fret>>  frets = new HashMap<>();
        fretBoard.setTuning(tuning);

        List<BasicNote> tuningNotes = new ArrayList<>();

        tuningNotes.add(basicNoteRepository.findById(tuning.getS1()).get());
        tuningNotes.add(basicNoteRepository.findById(tuning.getS2()).get());
        tuningNotes.add(basicNoteRepository.findById(tuning.getS3()).get());
        tuningNotes.add(basicNoteRepository.findById(tuning.getS4()).get());
        tuningNotes.add(basicNoteRepository.findById(tuning.getS5()).get());
        tuningNotes.add(basicNoteRepository.findById(tuning.getS6()).get());

        if (tuning.getS7() != null) {
            tuningNotes.add(basicNoteRepository.findById(tuning.getS7()).get());
        }

        if (tuning.getS8() != null) {
            tuningNotes.add(basicNoteRepository.findById(tuning.getS8()).get());
        }


        for (int i = 0; i < tuningNotes.size(); i++) {
            frets.put(i + 1, tuneString(tuningNotes.get(i).getBasicPos(), i + 1));
        }
        fretBoard.setFrets(frets);
        return fretBoard;
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
