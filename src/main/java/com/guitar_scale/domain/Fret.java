package com.guitar_scale.domain;

import lombok.Data;

@Data
public class Fret {
    private int stringNo;
    private int fretNo;
    private BasicNote note;
}
