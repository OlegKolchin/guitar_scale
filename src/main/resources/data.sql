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

insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('E_STANDARD', 'E', 'B', 'G', 'D', 'A', 'E', 6);
insert into tuning(tuning_name, s1, s2, s3, s4, s5, s6, number_of_strings) values('DROP_D', 'E', 'B', 'G', 'D', 'A', 'D', 6);

insert into default_settings(profile_name, tuning_name, number_of_strings, scale_name, full_scale_ind, active_ind) values('DEFAULT', 'E_STANDARD', 6, 'E_MINOR', 'Y', 'Y');
-- insert into default_settings(profile_name, tuning_name, number_of_strings, scale_name, full_scale_ind, active_ind) values('DEFAULT', 'DROP_D', 6, 'E_MINOR', 'Y', 'N');

insert into scale(scale_name, full_scale_ind, degree1, degree2, degree3, degree4, degree5, degree6, degree7) values ('E_MINOR', 'Y', 'E', 'F#', 'G', 'A', 'B', 'C', 'D');

