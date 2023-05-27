package com.guitar_scale.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tuning")
public class Tuning {
    @Id
    @Column(name = "tuning_name", unique = true, nullable = false)
    private String tuningName;

    private String s1;

    private String s2;

    private String s3;

    private String s4;

    private String s5;

    private String s6;

    private String s7;

    private String s8;

}
