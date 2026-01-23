package com.guitar_scale.controller;

import com.guitar_scale.domain.ScaleItem;
import com.guitar_scale.service.GuitarService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scale")
public class ScaleController {
    private final GuitarService guitarService;

    public ScaleController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }


    @GetMapping("/createScale")
    public List<ScaleItem> createScale(@RequestParam String noteName,
                                       @RequestParam String patternName) {
        return guitarService.createScale(noteName, patternName);
    }

    @GetMapping("/createChordScale")
    public List<ScaleItem> createChordScale(@RequestParam String noteName,
                                       @RequestParam String patternName, @RequestParam String chordRootNote) {
        return guitarService.createChordScale(noteName, patternName, chordRootNote);
    }
}
