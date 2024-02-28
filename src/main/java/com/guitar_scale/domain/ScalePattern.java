package com.guitar_scale.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "scale_pattern")
@Data
public class ScalePattern {
    @Id
    @Column(name = "pattern_name")
    private String patterName;

    @Column(name = "pattern")
    private String pattern;

    @Column(name = "step_sequence")
    private String stepSequence;
}
