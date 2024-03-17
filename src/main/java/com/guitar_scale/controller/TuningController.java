package com.guitar_scale.controller;

import com.guitar_scale.domain.DefaultSettings;
import com.guitar_scale.domain.FretBoard;
import com.guitar_scale.domain.Tuning;
import com.guitar_scale.service.GuitarService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tuning")
public class TuningController {
    private final GuitarService guitarService;


    public TuningController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }

    @GetMapping
    public List<Tuning> getAllTunings() {
        return guitarService.getAllTuning();
    }

    @GetMapping("/byName")
    public Tuning getTuningByName(@RequestParam String tuningName) {
        return guitarService.getTuningByName(tuningName);
    }

//    @PostMapping
//    public void saveTuning(@RequestBody Tuning tuning) {
//        String s = "s";
//        guitarService.saveTuning(tuning);
//    }

    @GetMapping("/fret")
    public FretBoard getFrets(@RequestParam String tuningName) {
        return guitarService.getFretBoard(tuningName);
    }

    @GetMapping("/defaultTuning")
    public String getDefaultTuning() {
        return guitarService.getDefaultSettings().getTuningName();
    }

    @GetMapping("/defaultStringCount")
    public Integer getDefaultStringCount() {
        return guitarService.getDefaultSettings().getNumberOfStrings();
    }

    @GetMapping("/defaultSettings")
    public DefaultSettings getDefaultSettings() {
        return guitarService.getDefaultSettings();
    }
}
