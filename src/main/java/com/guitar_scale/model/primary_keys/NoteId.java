package com.guitar_scale.model.primary_keys;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class NoteId implements Serializable {
    private String noteName;
    private Integer stringNo;
    private Integer fretNo;
    private String tuneName;

    public NoteId(String noteName, Integer stringNo, Integer fretNo, String tuneName) {
        this.noteName = noteName;
        this.stringNo = stringNo;
        this.fretNo = fretNo;
        this.tuneName = tuneName;
    }
}
