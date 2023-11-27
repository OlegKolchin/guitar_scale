import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from "@mui/material";

// Define the structure of your tuning data
interface Tuning {
    tuningName: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    s5: string;
    s6: string;
    s7: string | null;
    s8: string | null;
}

const Sidebar: React.FC = () => {
    // Use the interface to type your state
    const [tuning, setTuning] = useState<Tuning | null>(null);

    const handleApiCall = async () => {
        try {
            const response = await fetch('http://localhost:8080/tuning/byName?tuningName=E_STANDARD');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data: Tuning = await response.json();
            setTuning(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItemButton onClick={handleApiCall}>
                    <ListItemText primary="Get Tuning" />
                </ListItemButton>
                {/* Display Tuning Name */}
                {tuning && (
                    <ListItem>
                        <ListItemText primary={`Tuning: ${tuning.tuningName}`} />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;