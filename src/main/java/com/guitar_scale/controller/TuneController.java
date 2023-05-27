package com.guitar_scale.controller;

import com.guitar_scale.model.Tune;
import com.guitar_scale.model.TuneDTO;
import com.guitar_scale.repository.TuneRepository;
import com.guitar_scale.service.GuitarService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/tune")
public class TuneController {
    private final GuitarService service;

    public TuneController(GuitarService service) {
        this.service = service;
    }

    @PostMapping
    public void saveTune(@RequestBody TuneDTO tuneDTO) {
        ArrayList<Tune> tunes = new ArrayList<>();
        for (int i = 0; i < tuneDTO.getNotes().length; i++) {
            tunes.add(new Tune(tuneDTO.getTuneName(), tuneDTO.getNotes()[i], i + 1));
        }
        service.saveTune(tunes);
    }

    @GetMapping(params = {"name"})
    public List<Tune> getTune(String name) {
        return service.getTuneByName(name);
    }
}
