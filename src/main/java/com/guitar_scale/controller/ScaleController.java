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
                                            @RequestParam String patternName,
                                            @RequestParam String chordRootNote) {
        return guitarService.createChordScale(noteName, patternName, chordRootNote);
    }

    @GetMapping("/isIntervalInScale")
    public boolean isIntervalInScale(@RequestParam String rootNoteName,
                                     @RequestParam String patternName,
                                     @RequestParam String intervalName,
                                     @RequestParam String intervalRootNoteName) {
        return guitarService.isIntervalInScale(rootNoteName, patternName, intervalName, intervalRootNoteName);
    }

    /**
     * Filter multiple intervals at once for better performance
     * Returns only the interval names that fit within the scale
     *
     * @param rootNoteName Scale root note (e.g., "D")
     * @param patternName Scale pattern (e.g., "Minor")
     * @param intervalRootNoteName Clicked note (e.g., "E")
     * @param intervalNames List of all interval names to check
     * @return List of interval names that fit in the scale
     */
    @PostMapping("/filterIntervalsForScale")
    public List<String> filterIntervalsForScale(
            @RequestParam String rootNoteName,
            @RequestParam String patternName,
            @RequestParam String intervalRootNoteName,
            @RequestBody List<String> intervalNames) {
        return guitarService.filterIntervalsForScale(
                rootNoteName,
                patternName,
                intervalRootNoteName,
                intervalNames
        );
    }

    @GetMapping("/filterChordsForScale")
    public List<String> filterChordsForScale(
            @RequestParam String rootNoteName,
            @RequestParam String patternName,
            @RequestParam String chordRootNoteName
    ) {

        return guitarService.filterChordsForScale(rootNoteName, patternName, chordRootNoteName);
    }
}