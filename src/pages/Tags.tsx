import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MobileNavbar from '@/components/UI/MobileNav';
import CircularProgress from '@mui/material/CircularProgress';

type TagData = {
  id: string;
  count: number;
  name: string;
};

const Tags: FC = () => {
  const navigate = useNavigate();
  const { data: tags, isValidating } = useSWR('https://avl-frontend-exam.herokuapp.com/api/tags', (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  return (
    <div className="overflow-auto justify-center flex w-full pt-20">
      <MobileNavbar
        action={() => {
          navigate('/');
        }}
      />
      <Container maxWidth="md">
        <h1 className="text-white">Tags</h1>
        {isValidating ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} className="pb-20 justify-center">
            {tags?.map((tag: TagData) => {
              return (
                <Grid key={tag.id} item>
                  <Box
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#1B1B1B',
                      width: '150px',
                      height: '150px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'end',
                    }}
                  >
                    <Box
                      sx={{
                        border: '4px solid #FFF',
                        borderRadius: '8px',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#FFF',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {tag.name}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Tags;
