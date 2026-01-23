import React, { useState, useEffect } from 'react';
import Line from './Line'; // Ensure this is the correct path to your Line component

interface Point {
    x: number;
    y: number;
}

interface LineProps {
    start: Point;
    end: Point;
}

const LineDrawingComponent: React.FC<{ bounds: DOMRect }> = ({ bounds }) => {
    const [lines, setLines] = useState<LineProps[]>([]);
    const [currentLine, setCurrentLine] = useState<LineProps | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const updateLine = (x: number, y: number) => {
        if (currentLine) {
            setCurrentLine({
                ...currentLine,
                end: { x, y }
            });
        } else {
            const newLine: LineProps = {
                start: { x, y },
                end: { x, y }
            };
            setCurrentLine(newLine);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDrawing) {
            const rect = e.currentTarget.getBoundingClientRect();
            updateLine(e.clientX - rect.left, e.clientY - rect.top);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Alt" && !isDrawing) {
            setIsDrawing(true);
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Alt" && isDrawing) {
            setIsDrawing(false);
            if (currentLine) {
                setLines([...lines, currentLine]);
                setCurrentLine(null);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentLine, isDrawing]);

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                width: '100%', height: '100%', position: 'absolute', zIndex: 10
            }}
        >
            {lines.map((line, index) => (
                <Line key={index} start={line.start} end={line.end} />
            ))}
            {currentLine && <Line start={currentLine.start} end={currentLine.end} />}
        </div>
    );
};

export default LineDrawingComponent;
