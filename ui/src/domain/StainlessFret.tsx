import * as React from "react";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";

export const StainlessFret = styled(Divider)(({ theme }) => ({
    borderColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',

    borderImageSlice: 1,
    borderImageSource: `linear-gradient(0deg, rgba(255,255,255) 0%, rgba(160,160,160) 50%, rgba(255,255,255) 100%)`,
    borderWidth: '0 7px',
    borderStyle: 'solid',
    height: '100%',
    borderRadius: '16px',
}));
