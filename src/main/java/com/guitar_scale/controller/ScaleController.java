package com.guitar_scale.controller;

import com.guitar_scale.domain.Scale;
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

    @GetMapping
    public List<Scale> getAllScales() {
        return guitarService.getAllScales();
    }

    @PostMapping
    public void saveScale(@RequestBody Scale scale) {
        guitarService.saveScale(scale);
    }
}
