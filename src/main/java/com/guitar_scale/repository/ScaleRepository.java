package com.guitar_scale.repository;

import com.guitar_scale.model.Scale;
import com.guitar_scale.model.primary_keys.ScaleId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ScaleRepository extends CrudRepository<Scale, ScaleId> {
    public List<Scale> findScaleByScaleName(String scaleName);

    public List<Scale> findScaleByScaleNameAndAndNoteName(String scaleName, String noteName);

    public List<Scale> findScaleByScaleNameAndScalePos(String scaleName, Integer scalePos);
}
