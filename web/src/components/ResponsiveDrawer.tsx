import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  NavLink, Link, useMatch, useNavigate,
} from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';

const logo = require('../assets/logo.png');

interface DrawerProps {
  drawerWidth : any,
  children : React.ReactNode
}

const ResponsiveDrawer = ({ drawerWidth, children } : DrawerProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const items = [
    {
      uid: 1,
      text: 'Panel de control',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      uid: 2,
      text: 'Cursos que dicto',
      icon: <HistoryEduIcon />,
      path: '/cursos',
    },
    {
      uid: 3,
      text: 'Actividades',
      icon: <MenuBookIcon />,
      path: '/actividades',
    },
    {
      uid: 4,
      text: 'Estadisticas',
      icon: <BarChartIcon />,
      path: '/estadisticas',
    },
    {
      uid: 5,
      text: 'Login',
      icon: <HomeIcon />,
      path: '/login',
    },
  ];

  let seccionActual = 'Pagina no encontrada';

  const drawer = (
    <>
      <Link to="/">
        <img
          src={logo}
          alt="KidSpace logo"
          width={drawerWidth - 10}
        />
      </Link>
      <Divider />
      <List sx={{
        // selected and (selected + hover) states
        '&& .Mui-selected, && .Mui-selected:hover': {
          bgcolor: (theme: Theme) => theme.palette.secondary.main,
        },
        // hover states
        '& .MuiListItemButton-root:hover': {
          bgcolor: (theme: Theme) => theme.palette.secondary.light,
        },
      }}
      >
        {items.map(({
          uid, text, icon, path,
        }) => {
          const active = useMatch({ path: `${path}/*` }) !== null;
          if (active) seccionActual = text;
          return (
            <ListItem
              disablePadding
              button
              component={NavLink}
              to={path}
              key={uid}
            >
              <ListItemButton
                selected={active}
              >
                <ListItemIcon sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
                  {icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="inherit"
        elevation={3}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {seccionActual}
          </Typography>

          <IconButton onClick={handleClick}>
            <AccountCircle />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="nav bar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            sx: {
              backgroundColor: (theme: Theme) => theme.palette.primary.main,
              color: (theme: Theme) => theme.palette.primary.contrastText,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          PaperProps={{
            sx: {
              backgroundColor: (theme: Theme) => theme.palette.primary.main,
              color: (theme: Theme) => theme.palette.primary.contrastText,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
