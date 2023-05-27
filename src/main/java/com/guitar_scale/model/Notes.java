package com.guitar_scale.model;

import com.guitar_scale.model.primary_keys.NoteId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "notes")
@IdClass(NoteId.class)
public class Notes {
    @Id
    private String noteName;

    @Id
    private Integer stringNo;

    @Id
    private Integer fretNo;
    private Integer basicNo;

    @Id
    private String tuneName;

    public Notes(String noteName, Integer stringNo, Integer fretNo, Integer basicNo, String tuneName) {
        this.noteName = noteName;
        this.stringNo = stringNo;
        this.fretNo = fretNo;
        this.basicNo = basicNo;
        this.tuneName = tuneName;
    }
}
