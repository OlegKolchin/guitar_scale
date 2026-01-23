package com.guitar_scale.domain;

import com.guitar_scale.domain.id.TuningItemId;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tuning_item")
@IdClass(TuningItemId.class)
public class TuningItem {

    @Id
    @Column(name = "tuning_name")
    private String tuningName;

    @Id
    @Column(name = "string_no")
    private Integer stringNo;

    @Id
    @Column(name = "note_name")
    private String noteName;

    @Id
    @Column(name = "octave")
    private Integer octave;
}
