import React from 'react';
import {Chip} from "@mui/material";
import { styled } from '@mui/material/styles';


interface TuningChipProps {
    tuningName: string;
}

const StyledChip = styled(Chip)({
    margin: '8px',
});

function TuningChip({ tuningName }: TuningChipProps) {
    return (
        <StyledChip
            label={tuningName}
            clickable
            color="primary"
        />
    );
}

export default TuningChip;
