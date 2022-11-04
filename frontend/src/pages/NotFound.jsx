import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Dashboard>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
            }}
            >
            <Typography variant="h1">
                404 Not Found
            </Typography>
            <Typography variant="h6">
                Sorry! The page you’re looking for doesn’t exist.
            </Typography>
            <Button onClick={() => navigate('/app')}>Dashboard</Button>
            </Box>
        </Dashboard>
    )
}

export default NotFound;