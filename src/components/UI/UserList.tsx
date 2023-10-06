import React, { useState, FC } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../common/TabPanel';
import FollowerFollowing from './FollowerFollowing';

const UserList: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-96 bg-dark flex-none overflow-auto">
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        centered
        sx={{
          '& .MuiButtonBase-root.Mui-selected': {
            color: '#FFF',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFF',
          },
        }}
      >
        <Tab
          label="Followers"
          sx={{
            color: '#929292',
            textTransform: 'none',
          }}
        />
        <Tab
          label="Following"
          sx={{
            color: '#929292',
            textTransform: 'none',
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FollowerFollowing apiUrl="https://avl-frontend-exam.herokuapp.com/api/users/all" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowerFollowing apiUrl="https://avl-frontend-exam.herokuapp.com/api/users/friends" />
      </TabPanel>
    </div>
  );
};

export default UserList;
