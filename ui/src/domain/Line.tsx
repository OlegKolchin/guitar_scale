import React from 'react';
import { styled } from '@mui/material/styles';

interface Point {
    x: number;
    y: number;
}

interface LineProps {
    start: Point;
    end: Point;
}

const calculateLineProperties = (start: Point, end: Point) => {
    const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    return { length, angle };
};

const StyledLine = styled('div')<LineProps>(({ start, end }) => {
    const { length, angle } = calculateLineProperties(start, end);
    return {
        position: 'absolute',
        left: `${start.x}px`,
        top: `${start.y}px`,
        width: `${length}px`,
        height: '5px', // Line thickness
        backgroundColor: 'red',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0'
    };
});

const Line: React.FC<LineProps> = ({ start, end }) => {
    return <StyledLine start={start} end={end} />;
};

export default Line;
