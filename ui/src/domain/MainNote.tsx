import * as React from "react";
import {Avatar} from "@mui/material";
import {styled} from "@mui/material/styles";

interface MainNoteProps {
    noteName:string,
    top:string,
    left:string
}

const StyledAvatar = styled(Avatar) ({
    backgroundColor : '#199383',
    width: 'min(2vw, 2vh)',
    height: 'min(2vw, 2vh)',
    fontSize: 'clamp(7px, 1.1vw, 10px)',
    minWidth: '24px',
    minHeight: '24px',
    maxWidth: '24px',
    maxHeight: '24px',
    fontWeight: 'bold',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
})

export const MainNote: React.FC<MainNoteProps> = ({noteName, top, left}) => {
    const avatarContent = noteName;

    return (<StyledAvatar
        sx={{
            position : 'absolute',
            top : top,
            left: left,
            transform: 'translateX(-50%)',
        }}
    >
        {avatarContent}
    </StyledAvatar>
    );
}