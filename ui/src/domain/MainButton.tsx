import * as React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

/* Just wanted to explore how class system works in REACT =) */
export class MainButton {
    private _backgroundColor: string;
    private _boxShadow: string;
    private _color: string;
    private _hoverColor: string;
    private _hoverShadow: string;


    constructor(backgroundColor: string, boxShadow: string, color: string, hoverColor: string, hoveShadow: string) {
        this._backgroundColor = backgroundColor;
        this._boxShadow = boxShadow;
        this._color = color;
        this._hoverColor = hoverColor;
        this._hoverShadow = hoveShadow;
    }


    set backgroundColor(value: string) {
        this._backgroundColor = value;
    }

    set boxShadow(value: string) {
        this._boxShadow = value;
    }

    set color(value: string) {
        this._color = value;
    }

    set hoverColor(value: string) {
        this._hoverColor = value;
    }

    set hoverShadow(value: string) {
        this._hoverShadow = value;
    }

    createStyledButton() {
        return styled(Button)({
            backgroundColor: this._backgroundColor,
            boxShadow: this._boxShadow,
            color: this._color,
            '&:hover': {
                backgroundColor: this._hoverColor,
                boxShadow: this._hoverShadow,
            },
        });
    }
}

