import React from 'react';
import ResponsiveDrawer from '../components/ResponsiveDrawer';

const drawerWidth = 240;

interface LayoutProps {
  children : React.ReactNode
}

const Layout : React.FC<LayoutProps> = ({ children }) => (
  <ResponsiveDrawer drawerWidth={drawerWidth}>
    <img
      src="https://1.bp.blogspot.com/-9wb-YBgh0Z0/YNWgbkit_UI/AAAAAAAD0Vc/TLAwTtjerRsJXAzowCqOgtfn-P-NLxS8QCLcBGAsYHQ/s1104/mj20.jpg"
      alt="korone"
    />
    {children}
  </ResponsiveDrawer>
);

export default Layout;
