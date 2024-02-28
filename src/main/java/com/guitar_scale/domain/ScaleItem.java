package com.guitar_scale.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "scale_item")
@IdClass(ScaleItemId.class)
public class ScaleItem {
    @Id
    private String scaleName;

    @Id
    private String noteName;

    @Id
    private String scalePos;
}
