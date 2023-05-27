package com.guitar_scale.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Note {
    private int fret;
    private String name;
    private int scaleNo;
    private int basicNo;

    public Note(int fret, String name, int scaleNo, int basicNo) {
        this.fret = fret;
        this.name = name;
        this.scaleNo = scaleNo;
        this.basicNo = basicNo;
    }

}
