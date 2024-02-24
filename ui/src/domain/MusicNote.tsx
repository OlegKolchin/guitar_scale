import * as React from "react";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import {Scale} from "../interface/Scale";
import {useDefaultSettings} from "../context/DefaultSettingsContext";

interface MusicNoteProps {
    noteName: string;
    noteScalePosition: string;
    top: string;
    left: string;
}

const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgb(224,218,223)',
    color: 'white',
    width: 'min(2vw, 2vh)',
    height: 'min(2vw, 2vh)',
    fontSize: 'clamp(7px, 1.1vw, 10px)',
    minWidth: '24px',
    minHeight: '24px',
    maxWidth: '24px',
    maxHeight: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',

    // transform: 'translateX(-50%) rotateX(20deg) rotateY(20deg)',


});

const MusicNote: React.FC<MusicNoteProps> = ({ noteName, noteScalePosition, top, left }) => {
    const { showScalePosition } = useDefaultSettings();

    // You can adjust the colors as needed
    const noteNameStyle = { color: 'black', fontWeight: 'bold' }; // Example color for noteName
    const noteScalePositionStyle = { color: 'green', fontWeight: 'bold'}; // Example color for noteScalePosition

    const avatarContent = showScalePosition ? (
        <React.Fragment>
            <span style={noteNameStyle}>{noteName}</span>
            <span style={noteScalePositionStyle}>{noteScalePosition}</span>
        </React.Fragment>
    ) : (
        <span style={noteNameStyle}>{noteName}</span>
    );

    return (
        <StyledAvatar
            sx={{
                position: 'absolute',
                top: top,
                left: left,
                transform: 'translateX(-50%)',
                display: 'flex', // Ensure the content is centered
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {avatarContent}
        </StyledAvatar>
    );
};

export default MusicNote;
