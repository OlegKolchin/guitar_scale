package com.guitar_scale.repository;

import com.guitar_scale.domain.DefaultSettings;
import org.springframework.data.repository.CrudRepository;

public interface DefaultSettingsRepository extends CrudRepository<DefaultSettings, String> {
}
