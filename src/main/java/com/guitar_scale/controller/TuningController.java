package com.guitar_scale.controller;

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

    @PostMapping
    public void saveTuning(@RequestBody Tuning tuning) {
        String s = "s";
        guitarService.saveTuning(tuning);
    }
}
