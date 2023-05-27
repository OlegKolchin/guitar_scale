package com.guitar_scale.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Tuning {
    private ArrayList<GuitarString> strings = new ArrayList<>();

    private String name;

    private Tuning(ArrayList<GuitarString> strings, String name) {
        this.strings = strings;
        this.name = name;
    }

    public static final Tuning E_STANDARD = eStandard();
    public static final Tuning DROP_D = dropD();
    public static final Tuning DROP_C = dropC();

    private static Tuning eStandard() {

        return new Tuning(eStandard().tuneGuitar(List.of("E", "B", "G", "D", "A", "E")), "E_STANDARD");
    }

    private static Tuning dropD() {
        return new Tuning(eStandard().tuneGuitar(List.of("E", "B", "G", "D", "A", "D")), "DROP_D");
    }

    private static Tuning dropC() {
        return new Tuning(eStandard().tuneGuitar(List.of("D", "A", "F", "C", "G", "C")), "DROP_C");
    }

    public ArrayList<GuitarString> getStrings() {
        return strings;
    }

    private HashMap<String, Integer> getBasicNotes() {
        HashMap<String, Integer> basicNotes = new HashMap<>();
        basicNotes.put("C", 1);
        basicNotes.put("C#", 2);
        basicNotes.put("D", 3);
        basicNotes.put("D#", 4);
        basicNotes.put("E", 5);
        basicNotes.put("F", 6);
        basicNotes.put("F#", 7);
        basicNotes.put("G", 8);
        basicNotes.put("G#", 9);
        basicNotes.put("A", 10);
        basicNotes.put("A#", 11);
        basicNotes.put("B", 12);
        return basicNotes;
    }

    private HashMap<Integer, String> getBasicNotesRev() {
        HashMap<Integer, String> basicNotes = new HashMap<>();
        basicNotes.put(1, "C");
        basicNotes.put(2, "C#");
        basicNotes.put(3, "D");
        basicNotes.put(4, "D#");
        basicNotes.put(5, "E");
        basicNotes.put(6, "F");
        basicNotes.put(7, "F#");
        basicNotes.put(8, "G");
        basicNotes.put(9, "G#");
        basicNotes.put(10, "A");
        basicNotes.put(11, "A#");
        basicNotes.put(12, "B");

        return basicNotes;
    }



//    private Map<Integer, ArrayList<Note>> tuneGuitar(List<String> tune) {
//        Map<Integer, ArrayList<Note>> notes = new HashMap<>();
//        for (int i = 0; i < tune.size(); i++) {
//            notes.put(i + 1, getString(tune.get(i)));
//        }
//        return notes;
//    }

    private ArrayList<GuitarString> tuneGuitar(List<String> tune) {
        ArrayList<GuitarString> frets = new ArrayList<>();
        for (int i = 0 ; i < tune.size(); i++) {
            frets.add(getString(tune.get(0), i + 1));
        }
        return frets;
    }

    private GuitarString getString(String st, Integer number) {
        ArrayList<Note> notes = new ArrayList<>();
        HashMap<String, Integer> basicNotes = getBasicNotes();
        HashMap<Integer, String> basicNotesRev = getBasicNotesRev();

        for (int i = 0; i < 25; i++) {
            if (i == 0) {
                Note note = new Note(i, st, 0, basicNotes.get(st));
                notes.add(note);
                continue;
            }
            Note prev = notes.get(i - 1);
            Integer basicNo = prev.getBasicNo() == 12 ? 1 : prev.getBasicNo() + 1;
            String name = basicNotesRev.get(basicNo);
            Note note = new Note(i, name, 0, basicNo);
            notes.add(note);
        }
        return new GuitarString(number, st, notes);
    }
}
