package com.guitar_scale.repository;

import com.guitar_scale.domain.ChordPattern;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChordPatternRepository extends CrudRepository<ChordPattern, String> {

    @Query(nativeQuery = true, value = "select * from chord_pattern order by pattern_name")
    List<ChordPattern> getAllOrdered();
}
