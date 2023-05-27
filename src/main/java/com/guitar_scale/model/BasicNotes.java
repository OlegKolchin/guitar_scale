package com.guitar_scale.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
@Entity
@Table(name = "basic_notes")
public class BasicNotes {
    @Column(unique = true, name = "note_name")
    @Id
    private String noteName;

    @Column(unique = true, name = "basic_pos")
    private Integer basicPos;//ssss

    public BasicNotes(String noteName, Integer basicPos) {
        this.noteName = noteName;
        this.basicPos = basicPos;
    }


}
