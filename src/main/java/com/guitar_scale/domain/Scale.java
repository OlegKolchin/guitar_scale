package com.guitar_scale.domain;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "scale")
public class Scale {
    @Id
    @Column(unique = true, name = "scale_name", nullable = false)
    private String scaleName;

    @Column(name = "full_scale_ind")
    private String fullScaleInd;

    private String degree1;
    private String degree2;
    private String degree3;
    private String degree4;
    private String degree5;
    private String degree6;
    private String degree7;
}
