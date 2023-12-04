import * as React from "react";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";

export const NickelString = styled(Divider)({
    borderBottomColor: 'transparent', // Remove default line color
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(90deg, rgba(180,180,180) 0%, rgba(120,120,120) 50%, rgba(180,180,180) 100%)`, // Updated to a matte, non-transparent gradient
    borderWidth: '2px', // You can adjust the thickness
    borderStyle: 'solid',
    width: '99%',
    borderRadius: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', // Consider adjusting the shadow for a more matte look
});
