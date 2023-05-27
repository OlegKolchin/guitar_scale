package com.guitar_scale.service;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.Tuning;
import com.guitar_scale.repository.BasicNoteRepository;
import com.guitar_scale.repository.TuningRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GuitarService {
    private final BasicNoteRepository basicNoteRepository;
    private final TuningRepository tuningRepository;
//    private final NotesRepository notesRepository;
//    private final ScaleRepository scaleRepository;
//    private final TuneRepository tuneRepository;

    public GuitarService(BasicNoteRepository basicNoteRepository, TuningRepository tuningRepository) {
        this.basicNoteRepository = basicNoteRepository;
//        this.notesRepository = notesRepository;
//        this.scaleRepository = scaleRepository;
//        this.tuneRepository = tuneRepository;
        this.tuningRepository = tuningRepository;
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
        List<Tuning> tuningLst = new ArrayList<>();
        tuningRepository.findAll().forEach(tuningLst::add);
        return tuningLst;
    }

    public void saveTuning(Tuning tuning) {
        tuningRepository.save(tuning);
    }

//    public void saveTune(ArrayList<Tune> tune) {
//        tuneRepository.saveAll(tune);
//    }
//
//    public List<Tune> getTuneByName(String name) {
//        return tuneRepository.getTuneByTuneName(name);
//    }


}
