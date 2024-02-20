package com.guitar_scale.service;

import com.guitar_scale.domain.*;
import com.guitar_scale.repository.BasicNoteRepository;
import com.guitar_scale.repository.ScaleRepository;
import com.guitar_scale.repository.TuningRepository;
import com.guitar_scale.repository.DefaultSettingsRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class GuitarService {
    private final BasicNoteRepository basicNoteRepository;
    private final TuningRepository tuningRepository;
    private final ScaleRepository scaleRepository;
    private final DefaultSettingsRepository defaultSettingsRepository;
//    private final NotesRepository notesRepository;
//    private final ScaleRepository scaleRepository;
//    private final TuneRepository tuneRepository;

    public GuitarService(BasicNoteRepository basicNoteRepository, TuningRepository tuningRepository, ScaleRepository scaleRepository, DefaultSettingsRepository defaultSettingsRepository) {
        this.basicNoteRepository = basicNoteRepository;
//        this.notesRepository = notesRepository;
//        this.scaleRepository = scaleRepository;
//        this.tuneRepository = tuneRepository;
        this.tuningRepository = tuningRepository;
        this.scaleRepository = scaleRepository;
        this.defaultSettingsRepository = defaultSettingsRepository;
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


//    public void saveTune(ArrayList<Tune> tune) {
//        tuneRepository.saveAll(tune);
//    }
//
//    public List<Tune> getTuneByName(String name) {
//        return tuneRepository.getTuneByTuneName(name);
//    }


}
