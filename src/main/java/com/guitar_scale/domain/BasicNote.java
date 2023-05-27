package com.guitar_scale.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
@Entity
@Table(name = "basic_note")
public class BasicNote {
    @Column(unique = true, name = "note_name")
    @Id
    private String noteName;

    @Column(unique = true, name = "basic_pos")
    private Integer basicPos;

    public BasicNote(String noteName, Integer basicPos) {
        this.noteName = noteName;
        this.basicPos = basicPos;
    }


}
