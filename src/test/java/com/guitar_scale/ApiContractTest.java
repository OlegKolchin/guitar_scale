package com.guitar_scale;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.aMapWithSize;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Pins the REST contract described in docs/agents/API.md: status and JSON shape of every endpoint,
 * against the real seed data. Parameters go through {@code .param(...)} so names with spaces are
 * encoded the way a browser would.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ApiContractTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    // ------------------------------------------------------------------ /tuning

    @Test
    void defaultSettingsReturnsTheStartupProfile() throws Exception {
        mvc.perform(get("/tuning/defaultSettings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profileName").value("DEFAULT"))
                .andExpect(jsonPath("$.tuningName").value("E STANDARD"))
                .andExpect(jsonPath("$.numberOfStrings").value(6))
                .andExpect(jsonPath("$.coreNoteName").value("D"))
                .andExpect(jsonPath("$.patternName").value("Minor"));
    }

    @Test
    void newTuningReturnsTheStringsOrderedByStringNumber() throws Exception {
        mvc.perform(get("/tuning/newTuning").param("tuningName", "E STANDARD"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(6)))
                .andExpect(jsonPath("$[*].stringNo", contains(1, 2, 3, 4, 5, 6)))
                .andExpect(jsonPath("$[0].noteName").value("E"))
                .andExpect(jsonPath("$[0].octave").value(4));
    }

    @Test
    void getAllTuningsReturnsAnObjectKeyedByTuningName() throws Exception {
        mvc.perform(get("/tuning/getAllTunings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", aMapWithSize(11)))
                .andExpect(jsonPath("$['E STANDARD']", hasSize(6)))
                .andExpect(jsonPath("$['B STANDARD7']", hasSize(7)));
    }

    @Test
    void fretReturnsTheFretboardKeyedByStringNumber() throws Exception {
        mvc.perform(get("/tuning/fret").param("tuningName", "E STANDARD"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.frets", aMapWithSize(6)))
                .andExpect(jsonPath("$.frets['1']", hasSize(15)))
                .andExpect(jsonPath("$.frets['2'][0].fretNo").value(1))
                .andExpect(jsonPath("$.frets['2'][0].note.noteName").value("C"))
                .andExpect(jsonPath("$.frets['2'][0].note.absolutePos").value(37));
    }

    @Test
    void fretNewReturnsTheSameFretboardAsFret() throws Exception {
        String fret = mvc.perform(get("/tuning/fret").param("tuningName", "E STANDARD"))
                .andReturn().getResponse().getContentAsString();
        mvc.perform(get("/tuning/fretNew").param("tuningName", "E STANDARD"))
                .andExpect(status().isOk())
                .andExpect(content().json(fret, true));
    }

    @Test
    void defaultTuningReturnsThePlainTuningName() throws Exception {
        mvc.perform(get("/tuning/defaultTuning"))
                .andExpect(status().isOk())
                .andExpect(content().string("E STANDARD"));
    }

    @Test
    void defaultStringCountReturnsANumber() throws Exception {
        mvc.perform(get("/tuning/defaultStringCount"))
                .andExpect(status().isOk())
                .andExpect(content().string("6"));
    }

    // ------------------------------------------------------------------ /scale

    @Test
    void createScaleReturnsScaleItems() throws Exception {
        mvc.perform(get("/scale/createScale").param("noteName", "D").param("patternName", "Minor"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(7)))
                .andExpect(jsonPath("$[0].scaleName").value("D Minor"))
                .andExpect(jsonPath("$[0].noteName").value("D"))
                .andExpect(jsonPath("$[0].scalePos").value("1"));
    }

    @Test
    void createChordScaleReturnsTheReRootedScale() throws Exception {
        mvc.perform(get("/scale/createChordScale")
                        .param("noteName", "D").param("patternName", "Minor").param("chordRootNote", "G"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].noteName", contains("G", "A", "A#", "C", "D", "E", "F")))
                .andExpect(jsonPath("$[*].scalePos", contains("1", "2", "3", "4", "5", "6", "7")));
    }

    @Test
    void isIntervalInScaleReturnsABoolean() throws Exception {
        mvc.perform(get("/scale/isIntervalInScale")
                        .param("rootNoteName", "D").param("patternName", "Minor")
                        .param("intervalName", "Minor Third").param("intervalRootNoteName", "E"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    void filterIntervalsForScaleTakesAJsonArrayAndReturnsTheNamesThatFit() throws Exception {
        String body = objectMapper.writeValueAsString(java.util.List.of(
                "Unison", "Minor Second", "Major Second", "Minor Third", "Major Third", "Perfect Fourth",
                "Tritone", "Perfect Fifth", "Minor Sixth", "Major Sixth", "Minor Seventh", "Major Seventh",
                "Octave", "Minor Ninth", "Major Ninth", "Minor Tenth", "Major Tenth"));
        mvc.perform(post("/scale/filterIntervalsForScale")
                        .param("rootNoteName", "D").param("patternName", "Minor").param("intervalRootNoteName", "E")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(10)))
                .andExpect(jsonPath("$[0]").value("Unison"))
                .andExpect(jsonPath("$[9]").value("Minor Tenth"));
    }

    @Test
    void filterChordsForScaleReturnsChordNames() throws Exception {
        mvc.perform(get("/scale/filterChordsForScale")
                        .param("rootNoteName", "D").param("patternName", "Minor").param("chordRootNoteName", "D"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)));
    }

    // ------------------------------------------------------------------ /chords

    @Test
    void chordsReturnsElevenPatternsWithExactlyThreeKeys() throws Exception {
        // Pins the current contract; BL-05 will rename this key (patterName -> patternName).
        String json = mvc.perform(get("/chords"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(11)))
                .andReturn().getResponse().getContentAsString();

        for (JsonNode chord : objectMapper.readTree(json)) {
            Set<String> keys = new HashSet<>();
            chord.fieldNames().forEachRemaining(keys::add);
            assertThat(keys).as(chord.toString()).containsExactlyInAnyOrder("patterName", "pattern", "shortName");
        }
    }

    @Test
    void chordsByNameReturnsOnePattern() throws Exception {
        // Pins the current contract; BL-05 will rename this key.
        mvc.perform(get("/chords").param("chordName", "Minor Triad"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.patterName").value("Minor Triad"))
                .andExpect(jsonPath("$.pattern").value("WH-WW"))
                .andExpect(jsonPath("$.shortName").value("m"));
    }

    @Test
    void chordNotesReturnsPitchesOnTheFretboard() throws Exception {
        mvc.perform(get("/chords/chordNotes")
                        .param("rootNoteAbsolutePosition", "27")
                        .param("patternName", "Minor Triad")
                        .param("currentTuningName", "E STANDARD"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].absolutePos", contains(27, 30, 34)))
                .andExpect(jsonPath("$[*].noteName", contains("D", "F", "A")));
    }

    // ------------------------------------------------------------------ /basicNote

    @Test
    void basicNoteReturnsTheTwelveNotes() throws Exception {
        mvc.perform(get("/basicNote"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(12)));
    }

    @Test
    void basicNoteByIdReturnsTheNote() throws Exception {
        mvc.perform(get("/basicNote").param("id", "C"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.noteName").value("C"))
                .andExpect(jsonPath("$.basicPos").value(1));
    }

    @Test
    void basicNoteByUnknownIdIsNotFound() throws Exception {
        mvc.perform(get("/basicNote").param("id", "X"))
                .andExpect(status().isNotFound());
    }

    // ------------------------------------------------------------------ SPA forwarding

    @Test
    void aPathWithoutAnExtensionForwardsToIndexHtml() throws Exception {
        mvc.perform(get("/some/page"))
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("/index.html"));
    }
}
