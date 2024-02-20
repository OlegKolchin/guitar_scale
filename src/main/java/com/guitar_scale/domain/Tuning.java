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

    @Column(nullable = false)
    private Integer numberOfStrings;

    @Column(nullable = false)
    private String s1;

    @Column(nullable = false)
    private String s2;

    @Column(nullable = false)
    private String s3;

    @Column(nullable = false)
    private String s4;

    @Column(nullable = false)
    private String s5;

    @Column(nullable = false)
    private String s6;

    private String s7;

    private String s8;

}
