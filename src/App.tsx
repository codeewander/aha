import UserList from './components/UI/UserList';
import { Outlet } from 'react-router-dom';
import useScreenSize from './hooks/useScreenSize';

const App = () => {
  const { isWideScreen } = useScreenSize();

  return (
    <div className="bg-dark h-screen flex flex-col-reverse justify-between xs:flex-row xs:h-screen">
      <Outlet />
      {isWideScreen && <UserList />}
    </div>
  );
};

export default App;
