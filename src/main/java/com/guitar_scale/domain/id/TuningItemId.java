package com.guitar_scale.domain.id;

import lombok.Data;

import java.io.Serializable;

@Data
public class TuningItemId implements Serializable {

    private String tuningName;
    private Integer stringNo;
    private String noteName;
    private Integer octave;
}
