import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import '../types/theming.d.ts';

const drawerWidth = 240;

const Layout = () => (
  <ResponsiveDrawer drawerWidth={drawerWidth}>
    <Outlet />
  </ResponsiveDrawer>
);

export default Layout;
