package com.guitar_scale.domain;

import lombok.Data;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Data
public class FretBoard {
    private Tuning tuning;
    private HashMap<Integer, List<Fret>> frets;
}
