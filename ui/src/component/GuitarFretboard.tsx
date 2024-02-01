import * as React from 'react';
import GuitarNeck from "../module/GuitarNeck";
import { NickelString } from "../domain/NickelString";
import Box from "@mui/material/Box";
import { StainlessFret } from "../domain/StainlessFret";

export default function GuitarFretboard() {
    const numberOfStrings = 6; // Define the number of strings
    const stringOffset = 6.6; // Offset in percentage to lower the strings

    return (
        <GuitarNeck numberOfStrings={numberOfStrings}>
            <Box sx={{ width: '1%' }} /> {/* Empty Box for spacing */}
            {Array.from({ length: 15 }).map((_, index) => (
                <StainlessFret key={`fret-${index}`}/>
            ))}
            {Array.from({ length: numberOfStrings }).map((_, index) => (
                <NickelString
                    key={`string-${index}`}
                    sx={{
                        position: 'absolute',
                        top: `calc(${index * (100 / numberOfStrings)}% + ${stringOffset}%)`, // Dynamically adjusted top value
                        left: 0,
                        right: 0,
                        transform: 'translateY(-50%)', // Centers the string vertically
                    }}
                />
            ))}
        </GuitarNeck>
    );
}
