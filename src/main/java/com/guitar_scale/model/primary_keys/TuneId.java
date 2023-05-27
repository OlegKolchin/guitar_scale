package com.guitar_scale.model.primary_keys;

import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
public class TuneId implements Serializable {
    private String tuneName;
    private String noteName;
    private Integer stringNo;

    public TuneId(String tuneName, String noteName, Integer stringNo) {
        this.tuneName = tuneName;
        this.noteName = noteName;
        this.stringNo = stringNo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TuneId tuneId = (TuneId) o;
        return tuneName.equals(tuneId.tuneName) && noteName.equals(tuneId.noteName) && stringNo.equals(tuneId.stringNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tuneName, noteName, stringNo);
    }
}
