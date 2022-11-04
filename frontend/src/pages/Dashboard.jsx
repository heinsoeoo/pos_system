import { Box, Toolbar } from "@mui/material";
import MyAppBar from "../components/MyAppBar";
import { ToastContainer } from 'react-toastify';

const Dashboard = ({children}) => {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <MyAppBar/>
                <Toolbar/>
                <Box sx={{ maxWidth: "90vw", margin: 'auto', mt: "3rem"}}>
                    {children}
                </Box> 
            </Box>
            <ToastContainer autoClose={3000}/>
        </>
    )
}

export default Dashboard;