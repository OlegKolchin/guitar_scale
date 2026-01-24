// domain/StainlessFret.tsx

import * as React from "react";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";
import { FRET_STYLING } from "../constants/FretboardLayout";

export const StainlessFret = styled(Divider)(({ theme }) => ({
    borderColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',

    borderImageSlice: 1,
    borderImageSource: `linear-gradient(0deg, rgba(255,255,255) 0%, rgba(160,160,160) 50%, rgba(255,255,255) 100%)`,

    borderWidth: `0 ${FRET_STYLING.FRET_WIDTH_PX}px`,
    borderStyle: 'solid',
    height: '100%',
    borderRadius: `${FRET_STYLING.FRET_BORDER_RADIUS_PX}px`,
}));