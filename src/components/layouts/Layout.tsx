import { Outlet } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import Sidebar from '../UI/UserList';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
