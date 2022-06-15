import React from 'react';
import { ThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles';
import ResponsiveDrawer from '../components/ResponsiveDrawer';

const drawerWidth = 240;

interface LayoutProps {
  children : React.ReactNode
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#5c9dec',
      contrastText: 'rgb(255, 255, 255)',
    },
    secondary: {
      main: '#f57c00',
    },
  },
};

const theme = createTheme(themeOptions);

const Layout : React.FC<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ResponsiveDrawer drawerWidth={drawerWidth}>
      {children}
    </ResponsiveDrawer>
  </ThemeProvider>
);

export default Layout;
