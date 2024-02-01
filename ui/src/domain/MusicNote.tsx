import * as React from "react";
import { styled } from "@mui/material/styles";
import {Avatar, Chip, ChipProps} from "@mui/material";

// Define the interface for the MusicNote props
interface MusicNoteProps {
    noteName: string;
    noteScalePosition: string;
}

// Create a styled Chip component that uses the MusicNoteProps interface
export const MusicNote = styled(
    ({ noteName, noteScalePosition, ...otherProps }: MusicNoteProps & ChipProps) => (
        <Chip avatar={<Avatar>{noteName}</Avatar>}
            label={`${noteScalePosition}`} {...otherProps}
              clickable={true}
              sx={{
                  width: {
                      xs: '6',
                      sm: '4%',
                      md: '2%',
                  },
                  height: {
                      xs: '6%',
                      sm: '4%',
                      md: '2%',
                  },
              }}

            />
    )
)({
    // Add your custom styles here
    // Example: making the Chip more circular
    borderRadius: '30%',
    color:'red'
    // color: 'red',
    // backgroundColor: 'blanchedalmond'
    // ... any other custom styles
});