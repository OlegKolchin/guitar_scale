package com.guitar_scale.model.primary_keys;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class ScaleId implements Serializable {
    private String scaleName;
    private String noteName;
    private Integer scalePos;

    public ScaleId(String scaleName, String noteName, Integer scalePos) {
        this.scaleName = scaleName;
        this.noteName = noteName;
        this.scalePos = scalePos;
    }
}
