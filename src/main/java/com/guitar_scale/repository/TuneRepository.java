package com.guitar_scale.repository;

import com.guitar_scale.model.Tune;
import com.guitar_scale.model.primary_keys.TuneId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TuneRepository extends CrudRepository<Tune, TuneId> {
    public List<Tune> getTuneByTuneName(String name);
}
