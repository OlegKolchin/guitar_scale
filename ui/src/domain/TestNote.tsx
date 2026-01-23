import React, { useState, useCallback, useRef } from 'react';
import { styled } from "@mui/material/styles";

interface TestNoteProps {
    noteName: string;
    top: string;
    left: string;
}

const StyledCircle = styled('div')({
    backgroundColor: 'rgb(224,218,223)',
    width: '100px', // Initial width
    height: '50px', // Fixed height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    transformOrigin: 'center', // Rotate around the center
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
    cursor: 'grab'
});

const NoteName = styled('div')({
    color: 'white',
    fontSize: '1.1vw',
    transformOrigin: 'center', // Important for correct counter-rotation
});

const TestNote: React.FC<TestNoteProps> = ({ noteName, top, left }) => {
    const [rotation, setRotation] = useState(0);
    const [width, setWidth] = useState(100); // Initial width
    const [isDragging, setIsDragging] = useState(false);
    const [originalLeft, setOriginalLeft] = useState(parseFloat(left));
    const elementRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setOriginalLeft(parseFloat(event.currentTarget.style.left));
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = 'grabbing';
    }, []);

    const handleMouseMove = useCallback((event: React.PointerEvent) => {
        if (isDragging && elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate angle based on mouse position relative to the center
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
            setRotation(angle);

            // Determine which half is closer to the cursor and resize accordingly
            const cursorIsLeftSide = event.clientX < centerX;
            const distance = Math.abs(centerX - event.clientX);
            const newWidth = cursorIsLeftSide ? (centerX - event.clientX) * 2 : (event.clientX - centerX) * 2;
            if (newWidth > 100) { // Ensure minimum width
                setWidth(newWidth);
                if (cursorIsLeftSide) {
                    elementRef.current.style.left = `${originalLeft - (newWidth - 100) / 2}px`;
                }
            }
        }
    }, [isDragging, originalLeft]);

    const handleMouseUp = useCallback((event: React.PointerEvent) => {
        setIsDragging(false);
        if (elementRef.current) {
            elementRef.current.releasePointerCapture(event.pointerId);
            elementRef.current.style.cursor = 'grab';
        }
    }, []);

    return (
        <StyledCircle
            ref={elementRef}
            style={{
                top: top,
                left: `${originalLeft}px`,
                width: `${width}px`,
                transform: `rotate(${rotation}deg)`
            }}
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
        >
            <NoteName style={{ transform: `rotate(${-rotation}deg)` }}>
                {noteName}
            </NoteName>
        </StyledCircle>
    );
};

export default TestNote;
