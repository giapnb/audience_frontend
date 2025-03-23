import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme} from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import {AppProvider} from '@toolpad/core/AppProvider';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';
import {useDemoRouter} from '@toolpad/core/internal';
import {useMsal} from "@azure/msal-react";
import ApprovalIcon from '@mui/icons-material/Approval';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AudienceConfig} from "./dashboard/pages/AudienceConfig.jsx";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Store',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon/>,
    },

    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'audiences',
        title: 'Audience',
        icon: <BarChartIcon/>,
        children: [
            {
                segment: 'config',
                title: 'Configuration',
                icon: <ShoppingCartIcon/>,
            },
            {
                segment: 'approval',
                title: 'Approval',
                icon: <ApprovalIcon/>,
            },
        ],
    },
    {
        kind: 'header',
        title: 'Integrations',
    },
    {
        segment: 'tddc',
        title: 'TDDC',
        icon: <LayersIcon/>,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'logout',
        title: 'Logout',
        icon: <ExitToAppIcon/>,
    },

];

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {light: true, dark: true},
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function PageContent({pathname}) {
    const {instance} = useMsal();
    if (pathname === '/logout') {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }
    if (pathname === '/audiences/config') {
        return <AudienceConfig />
    }
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

function DashboardLayoutBasic(props) {
    const router = useDemoRouter('/dashboard');
    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={theme}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'Audience Store',
                homeUrl: '/dashboard',
            }}
        >
            <DashboardLayout>
                <PageContent pathname={router.pathname}/>
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

export default DashboardLayoutBasic;
