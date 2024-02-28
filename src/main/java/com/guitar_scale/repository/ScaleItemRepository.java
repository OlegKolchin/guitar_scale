package com.guitar_scale.repository;

import com.guitar_scale.domain.ScaleItem;
import com.guitar_scale.domain.ScaleItemId;
import org.springframework.data.repository.CrudRepository;

public interface ScaleItemRepository extends CrudRepository<ScaleItem, ScaleItemId> {
}
