package com.guitar_scale.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chord_pattern")
public class ChordPattern {
    @Id
    @Column(name = "pattern_name")
    private String patterName;

    @Column(name = "pattern")
    private String pattern;

    @Column(name = "short_name")
    private String shortName;
}
