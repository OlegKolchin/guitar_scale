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

    @Column(name = "numberOfStrings", nullable = false)
    private Integer numberOfStrings;

    @Column(name = "scale_name", nullable = false)
    private String scaleName;

    @Column(name = "full_scale_ind", nullable = false)
    private String fullScaleInd;

    @Column(name = "active_ind")
    private String activeInd;
}
