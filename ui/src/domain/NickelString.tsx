// domain/NickelString.tsx

import * as React from "react";
import { styled } from '@mui/material/styles';
import Divider from "@mui/material/Divider";
import { STRING_STYLING } from "../constants/FretboardLayout";

export const NickelString = styled(Divider)({
    borderBottomColor: 'transparent',
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(90deg, rgba(180,180,180) 0%, rgba(120,120,120) 50%, rgba(180,180,180) 100%)`,
    borderWidth: `${STRING_STYLING.STRING_THICKNESS_PX}px`,
    borderStyle: 'solid',
    width: `${STRING_STYLING.STRING_WIDTH_PERCENT}%`,
    borderRadius: `${STRING_STYLING.STRING_BORDER_RADIUS_PX}px`,
    boxShadow: STRING_STYLING.STRING_BOX_SHADOW,
});