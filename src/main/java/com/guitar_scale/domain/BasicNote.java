package com.guitar_scale.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "basic_note")
@AllArgsConstructor
@NoArgsConstructor
public class BasicNote {
    @Column(unique = true, name = "note_name")
    @Id
    private String noteName;

    @Column(unique = true, name = "basic_pos")
    private Integer basicPos;

    @Transient
    private Integer octave;

    @Transient
    private Integer absolutePos;

    public void updateAbsolutePos() {
        if (octave != null && basicPos != null) {
            this.absolutePos = calculateAbsolutePos(basicPos, octave);
        }
    }

    private int calculateAbsolutePos(Integer basicPos, Integer octave) {
        return octave == 1 ? basicPos : (octave - 1) * 12 + basicPos;
    }

}
