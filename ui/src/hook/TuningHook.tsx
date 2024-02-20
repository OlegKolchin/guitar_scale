import * as React from "react";
import { useEffect, useState } from "react";
import { Tuning } from "../interface/Tuning";

export function useTuningName(name: string) {
    const [tuningName, setTuningName] = useState('E STANDARD');

    useEffect(() => {
        const fetchTuning = async () => {
            try {
                const response = await fetch("http://localhost:8080/tuning/byName?tuningName=" + name);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Tuning = await response.json();
                setTuningName(data.tuningName);
            } catch (error) {
                console.error('Can not get tuning name:', error);
            }
        };

        fetchTuning();
    }, []);

    return tuningName;
};


export function useTuning(name: string) {
    const [tuning, setTuning] = useState<Tuning>();
    useEffect(() => {
        const fetchTuning = async () => {
            try {
                const response = await fetch("http://localhost:8080/tuning/byName?tuningName=" + name);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Tuning = await response.json();
                setTuning(data);
            } catch (error) {
                console.error('Can not get tuning name:', error);
            }
        };

        fetchTuning();
    }, []);

    return tuning;
};

