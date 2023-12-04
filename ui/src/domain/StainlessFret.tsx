import * as React from "react";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";

export const StainlessFret = styled(Divider)(({ theme }) => ({
    borderColor: 'transparent', // If using a border, set it to transparent
    borderLeftColor: 'transparent', // Specifically for left border
    borderRightColor: 'transparent', // Specifically for right border

    borderImageSlice: 1,
    borderImageSource: `linear-gradient(0deg, rgba(255,255,255) 0%, rgba(160,160,160) 50%, rgba(255,255,255) 100%)`, // Adjust gradient direction for vertical
    borderWidth: '0 7px', // Adjust borderWidth for vertical (top, right, bottom, left)
    borderStyle: 'solid',
    height: '100%', // Set height for vertical divider
    borderRadius: '16px',
    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
}));
