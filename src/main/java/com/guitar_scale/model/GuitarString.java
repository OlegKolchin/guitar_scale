package com.guitar_scale.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@Getter
@Setter
@ToString
public class GuitarString {
    private int number;
    private String tune;
    private ArrayList<Note> notes;

    public GuitarString(int number, String tune, ArrayList<Note> notes) {
        this.number = number;
        this.tune = tune;
        this.notes = notes;
    }
}
