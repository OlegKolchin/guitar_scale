package com.guitar_scale.model;

import com.guitar_scale.model.primary_keys.ScaleId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "scales")
@IdClass(ScaleId.class)
public class Scale {
    @Id
    private String scaleName;

    @Id
    private String noteName;

    @Id
    private Integer scalePos;

    public Scale(String scaleName, String noteName, Integer scalePos) {
        this.scaleName = scaleName;
        this.noteName = noteName;
        this.scalePos = scalePos;
    }
}
