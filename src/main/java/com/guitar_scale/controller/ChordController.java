package com.guitar_scale.controller;


import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.domain.ChordPattern;
import com.guitar_scale.service.GuitarService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chords")
public class ChordController {
    private GuitarService guitarService;

    public ChordController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }

    @GetMapping
    public List<ChordPattern> getAllChordPatterns() {
        return guitarService.getAllChordPatterns();
    }

    @GetMapping(params = {"chordName"})
    public ChordPattern getChordPatterByName(String chordName) {
        return guitarService.getChordPatternByName(chordName);
    }

    @GetMapping("/chordNotes")
    public List<BasicNote> getChordNotes(@RequestParam int rootNoteAbsolutePosition,
                                         @RequestParam String patternName,
                                         @RequestParam String currentTuningName) {
        return guitarService.calculateChordNotes(rootNoteAbsolutePosition, patternName, currentTuningName);
    }

}
