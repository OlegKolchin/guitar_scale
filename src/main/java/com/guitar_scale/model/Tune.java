package com.guitar_scale.model;


import com.guitar_scale.model.primary_keys.TuneId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "tunes")
@NoArgsConstructor
@IdClass(TuneId.class)
public class Tune {

    @Id
    private String tuneName;

    @Id
    private String noteName;

    @Id
    private Integer stringNo;

    public Tune(String tuneName, String noteName, Integer stringNo) {
        this.tuneName = tuneName;
        this.noteName = noteName;
        this.stringNo = stringNo;
    }
}
