package com.guitar_scale.repository;

import com.guitar_scale.domain.Scale;
import org.springframework.data.repository.CrudRepository;

public interface ScaleRepository extends CrudRepository<Scale, String> {
}
