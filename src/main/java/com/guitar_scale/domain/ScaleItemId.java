package com.guitar_scale.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class ScaleItemId implements Serializable {
    private String scaleName;
    private String noteName;
    private Integer scalePos;
}
