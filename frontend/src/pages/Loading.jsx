import Dashboard from "./Dashboard";
import { CircularProgress, Box } from '@mui/material';

export default function Loading() {
    return (
        <Dashboard>
            <Box sx={{ height: '80vh', display:'flex' }}>
                <Box sx={{ margin: 'auto' }}>
                    <CircularProgress/>
                </Box>
            </Box>
        </Dashboard>
    )
}