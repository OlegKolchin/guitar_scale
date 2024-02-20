import * as React from "react";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

interface MusicNoteProps {
    noteName: string;
    noteScalePosition: string;
    top: string;
    left: string;
}

const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgb(220,36,195)', // Example style
    color: 'white',
    width: 'min(2vw, 2vh)',
    height: 'min(2vw, 2vh)',
    fontSize: 'clamp(7px, 1.1vw, 10px)', // Smaller font size
    minWidth: '24px',
    minHeight: '24px',
    maxWidth: '24px',
    maxHeight: '24px',
});

const MusicNote: React.FC<MusicNoteProps> = ({ noteName, noteScalePosition, top, left }) => {
    const avatarContent = `${noteName}${noteScalePosition}`;

    return (
        <StyledAvatar
            sx={{
                position: 'absolute',
                top: top,
                left: left,
                transform: 'translateX(-50%)',
            }}
        >
            {avatarContent}
        </StyledAvatar>
    );
};

export default MusicNote;
