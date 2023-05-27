package com.guitar_scale.repository;

import com.guitar_scale.model.Notes;
import com.guitar_scale.model.primary_keys.NoteId;
import org.springframework.data.repository.CrudRepository;

public interface NotesRepository extends CrudRepository<Notes, NoteId> {
}
