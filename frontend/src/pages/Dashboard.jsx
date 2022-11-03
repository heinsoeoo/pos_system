import { Box, Toolbar } from "@mui/material";
import MyAppBar from "../components/MyAppBar";

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
        </>
    )
}

export default Dashboard;