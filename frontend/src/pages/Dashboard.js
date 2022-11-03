import { Box, Fab } from "@mui/material";
import { Link } from "react-router-dom";
import MyAppBar from "../components/MyAppBar";
import { Add } from '@mui/icons-material';

const Dashboard = ({children}) => {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <MyAppBar/>
                {children}
                <Link to='/create-invoice'>
                    <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: '20px', right: '20px'}}>
                        <Add/>
                    </Fab>
                </Link>
            </Box>
        </>
    )
}

export default Dashboard;