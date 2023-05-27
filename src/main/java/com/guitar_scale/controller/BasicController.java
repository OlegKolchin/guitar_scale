package com.guitar_scale.controller;

import com.guitar_scale.domain.BasicNote;
import com.guitar_scale.service.GuitarService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/basicNote")
public class BasicController {
    private final GuitarService service;

    public BasicController(GuitarService service) {
        this.service = service;
    }

    @GetMapping
    public List<BasicNote> getAllBasicNotes() {
        return service.getAllBasicNotes();
    }

    @GetMapping(params = {"id"})
    public BasicNote getNoteByName(String id) {
        Optional<BasicNote> note = service.getBasicNoteByName(id);
        if (note.isPresent()) {
            return note.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Note does not exist!");
        }
    }
}
