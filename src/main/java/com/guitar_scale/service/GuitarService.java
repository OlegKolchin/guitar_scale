package com.guitar_scale.service;

import com.guitar_scale.model.BasicNotes;
import com.guitar_scale.model.Scale;
import com.guitar_scale.model.Tune;
import com.guitar_scale.repository.BasicNotesRepository;
import com.guitar_scale.repository.NotesRepository;
import com.guitar_scale.repository.ScaleRepository;
import com.guitar_scale.repository.TuneRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GuitarService {
    private final BasicNotesRepository basicNotesRepository;
    private final NotesRepository notesRepository;
    private final ScaleRepository scaleRepository;
    private final TuneRepository tuneRepository;

    public GuitarService(BasicNotesRepository basicNotesRepository, NotesRepository notesRepository, ScaleRepository scaleRepository, TuneRepository tuneRepository) {
        this.basicNotesRepository = basicNotesRepository;
        this.notesRepository = notesRepository;
        this.scaleRepository = scaleRepository;
        this.tuneRepository = tuneRepository;
    }

    public List<BasicNotes> getAllBasicNotes() {
        List<BasicNotes> basicNotes = new ArrayList<>();
        basicNotesRepository.findAll().forEach(basicNotes :: add);
        return basicNotes;
    }

    public Optional<BasicNotes> getBasicNoteByName(String noteName) {
        return basicNotesRepository.findById(noteName);
    }

    public void saveTune(ArrayList<Tune> tune) {
        tuneRepository.saveAll(tune);
    }

    public List<Tune> getTuneByName(String name) {
        return tuneRepository.getTuneByTuneName(name);
    }


}
