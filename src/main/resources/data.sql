insert into basic_note(note_name, basic_pos) values ('C', 1);
insert into basic_note(note_name, basic_pos) values ('C#', 2);
insert into basic_note(note_name, basic_pos) values ('D', 3);
insert into basic_note(note_name, basic_pos) values ('D#', 4);
insert into basic_note(note_name, basic_pos) values ('E', 5);
insert into basic_note(note_name, basic_pos) values ('F', 6);
insert into basic_note(note_name, basic_pos) values ('F#', 7 );
insert into basic_note(note_name, basic_pos) values ('G', 8);
insert into basic_note(note_name, basic_pos) values ('G#', 9);
insert into basic_note(note_name, basic_pos) values ('A', 10);
insert into basic_note(note_name, basic_pos) values ('A#', 11);
insert into basic_note(note_name, basic_pos) values ('B', 12);


insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'E STANDARD', 6, 'D', 'Minor', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'B_STANDARD7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'DROP_A7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'C_STANDARD7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'DROP_D', 6, 'C', 'Pentatonic Major', 'Y');

insert into scale_pattern(pattern_name, pattern, step_sequence) values('Major', 'W-W-H-W-W-W', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Minor', 'W-H-W-W-H-W', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Dorian', 'W-H-W-W-W-H', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Phrygian', 'H-W-W-W-H-W', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Mixolydian', 'W-W-H-W-W-H', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Locrian', 'H-W-W-H-W-W', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Harmonic Minor', 'W-H-W-W-H-WH', '1|2|3|4|5|6|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Melodic Minor', 'W-H-W-W-W-W', '1|2|3|4|5|6|7');

insert into scale_pattern(pattern_name, pattern, step_sequence) values('Pentatonic Major', 'W-W-WH-W', '1|2|3|5|6');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Pentatonic Minor', 'WH-W-W-WH', '1|3|4|5|7');
insert into scale_pattern(pattern_name, pattern, step_sequence) values('Blues', 'WH-W-H-H-WH', '1|3|4|5|5♭|7');

-- E STANDARD
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 6, 'E', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 5, 'A', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 4, 'D', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 3, 'G', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 2, 'B', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('E STANDARD', 1, 'E', 4);

-- D STANDARD
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 6, 'D', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 5, 'G', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 4, 'C', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 3, 'F', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 2, 'A', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('D STANDARD', 1, 'D', 4);

-- DROP D
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 6, 'D', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 5, 'A', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 4, 'D', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 3, 'G', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 2, 'B', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP D', 1, 'E', 4);

-- DROP C
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 6, 'C', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 5, 'G', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 4, 'C', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 3, 'F', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 2, 'A', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP C', 1, 'D', 4);

-- DROP A
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 6, 'B', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 5, 'F#', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 4, 'D', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 3, 'A', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 2, 'E', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A', 1, 'A', 1);

-- DROP B
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 6, 'B', 1);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 5, 'F#', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 4, 'B', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 3, 'E', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 2, 'G#', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP B', 1, 'C#', 4);

-- DROP G
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 6, 'G', 1);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 5, 'D', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 4, 'G', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 3, 'C', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 2, 'E', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G', 1, 'A', 4);


-- DROP A7
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 7, 'A', 1);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 6, 'E', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 5, 'A', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 4, 'D', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 3, 'G', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 2, 'B', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP A7', 1, 'E', 4);

-- B STANDARD7
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 7, 'B', 1);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 6, 'E', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 5, 'A', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 4, 'D', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 3, 'G', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 2, 'B', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('B STANDARD7', 1, 'E', 4);

-- C STANDARD7
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 7, 'C', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 6, 'F', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 5, 'A#', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 4, 'D#', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 3, 'G#', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 2, 'C', 4);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('C STANDARD7', 1, 'F', 4);

-- DROP G7
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 7, 'G', 1);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 6, 'D', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 5, 'G', 2);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 4, 'C', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 3, 'F', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 2, 'A', 3);
insert into tuning_item(tuning_name, string_no, note_name, octave) values ('DROP G7', 1, 'D', 4);


-- Triads
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Triad', 'WW-WH', 'M');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Triad', 'WH-WW', 'm');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Diminished Triad', 'WH-WH', 'dim');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Augmented Triad', 'WW-WW', '+');
--Seventh Chords
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Seventh Chord', 'WW-WH-WW', 'Maj7');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Dominant Seventh Chord', 'WW-WH-WH', '7');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Seventh Chord', 'WH-WW-WH', 'm7');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Half-Diminished Seventh Chord', 'WH-WH-WH', 'm7b5');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Fully Diminished Seventh Chord', 'WH-WH-WH', 'dim7');
--
-- -- Ninth Chords
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Dominant Ninth Chord', 'WW-WH-WH-WW', '9');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Ninth Chord', 'WW-WH-WW-WW', 'Maj9');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Ninth Chord', 'WH-WW-WH-WW', 'm9');
--
-- -- Eleventh Chords
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Dominant Eleventh Chord', 'WW-WH-WH-WW-WH', '11');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Eleventh Chord', 'WW-WH-WW-WW-WH', 'Maj11');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Eleventh Chord', 'WH-WW-WH-WW-WH', 'm11');
--
-- -- Thirteenth Chords
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Dominant Thirteenth Chord', 'WW-WH-WH-WW-WH-WW', '13');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Thirteenth Chord', 'WW-WH-WW-WW-WH-WW', 'Maj13');
-- INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Thirteenth Chord', 'WH-WW-WH-WW-WH-WW', 'm13');
--
-- Suspended Chords
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Suspended Second Chord', 'W-WW', 'sus2');
INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Suspended Fourth Chord', 'WH-W', 'sus4');



