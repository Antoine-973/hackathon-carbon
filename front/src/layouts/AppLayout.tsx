import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Box from "@mui/material/Box";

export default function AppLayout(){
    return (
        <>
            <Header/>
            <Box sx={{
                paddingTop:'100px',
                minHeight:'100vh',
            }}>
                <Outlet/>
            </Box>
            <Footer/>
        </>
    )
}