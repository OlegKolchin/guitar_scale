package com.guitar_scale.repository;

import com.guitar_scale.domain.Tuning;
import org.springframework.data.repository.CrudRepository;

public interface TuningRepository extends CrudRepository<Tuning, String> {
}
