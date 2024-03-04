insert into basic_note(note_name, basic_pos) values ('C', 1);
insert into basic_note(note_name, basic_pos) values ('C#', 2);
insert into basic_note(note_name, basic_pos) values ('D', 3);
insert into basic_note(note_name, basic_pos) values ('D#', 4);
insert into basic_note(note_name, basic_pos) values ('E', 5);
insert into basic_note(note_name, basic_pos) values ('F', 6);
insert into basic_note(note_name, basic_pos) values ('F#', 7);
insert into basic_note(note_name, basic_pos) values ('G', 8);
insert into basic_note(note_name, basic_pos) values ('G#', 9);
insert into basic_note(note_name, basic_pos) values ('A', 10);
insert into basic_note(note_name, basic_pos) values ('A#', 11);
insert into basic_note(note_name, basic_pos) values ('B', 12);

insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('E STANDARD', 'E', 'B', 'G', 'D', 'A', 'E', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('D STANDARD', 'D', 'A', 'F', 'C', 'G', 'D', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('DROP D', 'E', 'B', 'G', 'D', 'A', 'D', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('DROP C', 'D', 'A', 'F', 'C', 'G', 'C', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('DROP A', 'A', 'E', 'A', 'D', 'F#', 'B', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, s7, number_of_strings) values('DROP A7', 'E', 'B', 'G', 'D', 'A', 'E', 'A', 7);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, s7, number_of_strings) values('B STANDARD7', 'E', 'B', 'G', 'D', 'A', 'E', 'B', 7);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, s7, number_of_strings) values('C STANDARD7', 'F', 'C', 'G#', 'D#', 'A#', 'F', 'C', 7);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, s7, number_of_strings) values('DROP G7', 'D', 'A', 'F', 'C', 'G', 'D', 'G', 7);

insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'E STANDARD', 6, 'D', 'Minor', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'B_STANDARD7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'DROP_A7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'C_STANDARD7', 7, 'C', 'Pentatonic Major', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, core_note_name, pattern_name, active_ind) values('DEFAULT', 'DROP_D', 6, 'C', 'Pentatonic Major', 'Y');


insert into scale(scale_name, full_scale_ind, degree1, degree2, degree3, degree4, degree5, degree6, degree7) values ('E_MINOR', 'Y', 'E', 'F#', 'G', 'A', 'B', 'C', 'D');


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

