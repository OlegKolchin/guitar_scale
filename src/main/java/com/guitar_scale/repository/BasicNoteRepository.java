package com.guitar_scale.repository;

import com.guitar_scale.domain.BasicNote;
import org.springframework.data.repository.CrudRepository;

public interface BasicNoteRepository extends CrudRepository<BasicNote, String> {
}
