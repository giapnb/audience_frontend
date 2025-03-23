import React from 'react';

import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import DashboardLayoutBasic from "./layout.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {loginRequest} from "./config/auth.js";


const TemplateContent = () => {
    const {instance} = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.log(e);
        });
    }
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <DashboardLayoutBasic />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Data Product
                            </Typography>
                            <Button color="inherit" onClick={() => handleLogin()}>Sign in </Button>

                        </Toolbar>
                    </AppBar>
                    <Box
                        sx={{
                            py: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography>Please sign-in to do any thing</Typography>
                    </Box>
                </Box>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <TemplateContent />
    );
}