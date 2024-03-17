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
    onClick: () => void;
}

const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgb(224,218,223)',
    color: 'white',
    width: 'min(2vw, 2vh)',
    height: 'min(2vw, 2vh)',
    fontSize: 'clamp(7px, 1.1vw, 10px)',
    minWidth: '19px',
    minHeight: '19px',
    maxWidth: '24px',
    maxHeight: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',

    // transform: 'translateX(-50%) rotateX(20deg) rotateY(20deg)',


});

const MusicNote: React.FC<MusicNoteProps> = ({ noteName, noteScalePosition, top, left , onClick}) => {
    const { showScalePosition, hideEmptyScaleNotes, defaultSettings, highlightCoreNote, chordRootNote} = useDefaultSettings();

    if (hideEmptyScaleNotes && noteScalePosition === '') {
        return null;
    }

    const noteNameStyle =
        (highlightCoreNote && noteName == defaultSettings.coreNoteName)
        ? { color: 'white', fontWeight: 'bold' }
        : noteName === chordRootNote
        ? { color: '#755139FF', fontWeight: 'bold' }
        : { color: 'black', fontWeight: 'bold' };


    const noteScalePositionStyle =
        (highlightCoreNote && noteName == defaultSettings.coreNoteName)
        ? { color: 'white', fontWeight: 'bolder', }
        : noteName === chordRootNote
        ? { color: '#755139FF', fontWeight: 'bolder', }
        : { color: 'green', fontWeight: 'bolder', };

    const noteColor =
        highlightCoreNote && noteName === defaultSettings.coreNoteName
        ? '#CBCE91FF'
        : noteName === chordRootNote
        ? '#F2EDD7FF'
        : 'rgb(224,218,223)';

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
                backgroundColor: noteColor,
                top: top,
                left: left,
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={onClick}
        >
            {avatarContent}
        </StyledAvatar>
    );
};

export default MusicNote;
