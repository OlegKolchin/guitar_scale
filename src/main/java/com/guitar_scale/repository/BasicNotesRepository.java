package com.guitar_scale.repository;

import com.guitar_scale.model.BasicNotes;
import org.springframework.data.repository.CrudRepository;

public interface BasicNotesRepository extends CrudRepository<BasicNotes, String> {
}
