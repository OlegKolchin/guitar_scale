package com.guitar_scale.controller;

import com.guitar_scale.domain.DefaultSettings;
import com.guitar_scale.domain.FretBoard;
import com.guitar_scale.domain.TuningItem;
import com.guitar_scale.service.GuitarService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tuning")
public class TuningController {
    private final GuitarService guitarService;


    public TuningController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }

//    @PostMapping
//    public void saveTuning(@RequestBody Tuning tuning) {
//        String s = "s";
//        guitarService.saveTuning(tuning);
//    }

    @GetMapping("/fret")
    public FretBoard getFrets(@RequestParam String tuningName) {
        return guitarService.getFretBoardNew(tuningName);
    }

    @GetMapping("fretNew")
    public FretBoard getFretsNew(@RequestParam String tuningName) {
        return guitarService.getFretBoardNew(tuningName);
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

    @GetMapping("/newTuning")
    public List<TuningItem> getTuningItemByName(@RequestParam String tuningName) {
        return guitarService.getTuningItemByName(tuningName);
    }

    @GetMapping("/getAllTunings")
    public Map<String, List<TuningItem>> getAllSavedTunings() {
        return guitarService.getAllSavedTunings();
    }
}
