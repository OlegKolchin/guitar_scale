package com.guitar_scale.domain;

import lombok.Data;
import java.util.HashMap;
import java.util.List;


@Data
public class FretBoard {
    private HashMap<Integer, List<Fret>> frets;
}
