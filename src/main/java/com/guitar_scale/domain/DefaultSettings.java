package com.guitar_scale.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "default_settings")
@Data
public class  DefaultSettings {

    @Id()
    @Column(unique = true, name = "profile_name", nullable = false)
    private String profileName;

    @Column(name = "tuning_name", nullable = false)
    private String tuningName;

    @Column(name = "number_of_strings", nullable = false)
    private Integer numberOfStrings;

    @Column(name = "core_note_name", nullable = false)
    private String coreNoteName;

    @Column(name =  "pattern_name", nullable = false)
    private String patternName;

    @Column(name = "active_ind")
    private String activeInd;
}
