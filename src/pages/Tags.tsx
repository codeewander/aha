import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import MobileNavbar from '@/components/UI/MobileNav';
import { Grid, Typography, Container, Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/UI/Navbar';
import useScreenSize from '@/hooks/useScreenSize';

type TagData = {
  id: string;
  count: number;
  name: string;
};

const Tags: FC = () => {
  const navigate = useNavigate();
  const { isMobileScreen } = useScreenSize();
  const { data: tags, isValidating } = useSWR('https://avl-frontend-exam.herokuapp.com/api/tags', (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  return (
    <>
      {!isMobileScreen && <Navbar />}
      <div className="overflow-auto justify-center flex w-full pt-20">
        <MobileNavbar
          action={() => {
            navigate('/');
          }}
          page="tags"
        />
        <Container
          maxWidth="md"
          sx={{
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <h1 className="text-white">Tags</h1>
          {isValidating ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} className="pb-20 justify-start">
              {tags?.map((tag: TagData) => {
                return (
                  <Grid
                    key={tag.id}
                    item
                    sx={{
                      maxWidth: '174px',
                    }}
                  >
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
                          paddingLeft: '14px',
                          paddingRight: '14px',
                        }}
                      >
                        {tag.name}
                      </Box>
                    </Box>
                    <div className="max-w-[150px] pt-[10px]">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          color: 'white',
                          fontSize: '14.9px',
                          paddingTop: '12px',
                        }}
                      >
                        {tag.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#B2B2B2"
                        sx={{
                          fontSize: '11.175px',
                        }}
                      >
                        {tag.count} questions
                      </Typography>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </div>
    </>
  );
};

export default Tags;
