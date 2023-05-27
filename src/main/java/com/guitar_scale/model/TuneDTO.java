package com.guitar_scale.model;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class TuneDTO {
    private String tuneName;
    private String[] notes;
    private String gg;

    public TuneDTO(String tuneName, String[] notes) {
        this.tuneName = tuneName;
        this.notes = notes;
        //
    }
}
