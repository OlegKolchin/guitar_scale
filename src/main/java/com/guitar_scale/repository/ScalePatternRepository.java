package com.guitar_scale.repository;

import com.guitar_scale.domain.ScalePattern;
import org.springframework.data.repository.CrudRepository;

public interface ScalePatternRepository extends CrudRepository<ScalePattern, String> {
}
