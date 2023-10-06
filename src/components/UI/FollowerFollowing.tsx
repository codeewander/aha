import { useState, useCallback, FC } from 'react';
import User from './User';
import Box from '@mui/material/Box';
import { UserData } from '@/constants/userTypes';
import useIntersectionObserver from '@/hooks/userIntersectionObserver';

interface FollowerFollowingProps {
  apiUrl: string;
}

const FollowerFollowing: FC<FollowerFollowingProps> = ({ apiUrl }) => {
  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasMore) {
        fetchData();
      }
    },
    { root: null, rootMargin: '0px', threshold: 0.8 },
  );

  const fetchData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}?page=${data.length / 20 + 1}&pageSize=20`);
      const { data: responseData } = await response.json();

      if (responseData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...responseData]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, [apiUrl, hasMore, isLoading, data.length]);

  return (
    <Box className="flex flex-col gap-y-4 overflow-auto">
      {data.map((userInfo: UserData) => {
        return (
          <div key={userInfo.id}>
            <User userInfo={userInfo} />
          </div>
        );
      })}
      <div ref={loaderRef}>{isLoading && <span>loading...</span>}</div>
    </Box>
  );
};

export default FollowerFollowing;
