import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import '../types/theming.d.ts';

const drawerWidth = 240;

interface LayoutProps {
  children : React.ReactNode
}

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#5c9dec',
      contrastText: 'rgb(255, 255, 255)',
    },
    secondary: {
      main: '#f57c00',
    },
    tertiary: palette.augmentColor({ color: { main: '#EC87C0' } }),
    quaternary: palette.augmentColor({ color: { main: '#A1C96A' } }),
    textcol: palette.augmentColor({ color: { main: '#063d69' } }),
  },
});

const Layout : React.FC<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ResponsiveDrawer drawerWidth={drawerWidth}>
      {children}
    </ResponsiveDrawer>
  </ThemeProvider>
);

export default Layout;
