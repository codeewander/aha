import { FC, useState } from 'react';
import DefaultAvatar from '@/assets/avatar.png';
import Box from '@mui/material/Box';
import Button from '../common/Button';
import { UserData } from '@/constants/userTypes';
import Skeleton from '@mui/material/Skeleton';
type UserProps = {
  userInfo: UserData;
};

const chipStyle = {
  border: '1px solid #FFF',
  fontSize: 12,
  fontWeight: 600,
  borderRadius: '20px',
  height: '28px',
  padding: '8px 10px',
};

const User: FC<UserProps> = ({ userInfo }) => {
  const { name, avater, username, isFollowing, id } = userInfo;
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  return (
    <Box className="text-white flex items-center justify-between ">
      <Box className="flex gap-x-4">
        {!imageLoaded[id] && <Skeleton variant="rectangular" width={24} height={44} />}
        <img
          alt="avatar"
          src={avater}
          onLoad={() => {
            setImageLoaded((prevImageLoaded) => ({
              ...prevImageLoaded,
              [id]: true,
            }));
          }}
          onError={(event) => {
            const imgElement = event.target as HTMLImageElement;
            imgElement.src = DefaultAvatar;
          }}
        />
        <div className="flex flex-col">
          <span className="text-base">{name}</span>
          <span className="text-sm opacity-50">@{username}</span>
        </div>
      </Box>
      {isFollowing ? (
        <Button text="Following" customStyle={chipStyle} />
      ) : (
        <Button
          text="Follow"
          customStyle={{
            background: '#121212',
            color: 'white',
            ...chipStyle,
          }}
        />
      )}
    </Box>
  );
};

export default User;
