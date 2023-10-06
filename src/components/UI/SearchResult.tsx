import { useState, useEffect, useRef, useMemo, useCallback, FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Grid, CardMedia, Card, Typography, Skeleton } from '@mui/material';
import Button from '@/components/common/Button';
import DefaultImage from '@/assets/resultImage.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import MobileNavbar from '@/components/UI/MobileNav';
import Stack from '@mui/material/Stack';
import { UserData } from '@/constants/userTypes';

type SearchResultProps = {
  setInitial: () => void;
};

const SearchResult: FC<SearchResultProps> = ({ setInitial }) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const initialApiCallMade = useRef(false);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const hasMore = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);
  const size = useMemo(() => searchParams.get('size'), [searchParams]);

  const loadMoreItems = useCallback(() => {
    const searchValue = searchParams.get('search');

    setIsLoading(true);
    fetch(
      `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${currentPage}&pageSize=${size}&keyword=${searchValue}`,
    )
      .then((response) => response.json())
      .then(({ data, totalPages }) => {
        setSearchResults((prev) => {
          return [...prev, ...data];
        });
        setCurrentPage((prev) => prev + 1);
        setTotalPages(totalPages);
        initialApiCallMade.current = true;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchParams, size]);

  useEffect(() => {
    if (!initialApiCallMade.current) {
      loadMoreItems();
      initialApiCallMade.current = true;
    }
  }, [loadMoreItems]);

  const backToHomePage = useCallback(() => {
    setInitial();
    setSearchResults([]);
    navigate('/');
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <MobileNavbar action={backToHomePage} />
      <div className="px-5 xs:p-0 pt-24 overflow-auto w-full flex justify-center">
        <div style={{ maxWidth: '725px', width: '80%' }}>
          <ArrowBackIcon
            sx={{
              color: 'white',
              position: 'relative',
              top: '35px',
              right: '35px',
              cursor: 'pointer',
              display: 'none',
              '@media (min-width: 468px)': {
                display: 'inline-block',
              },
            }}
            onClick={() => {
              setInitial();
              setSearchResults([]);
              navigate('/');
            }}
          />
          <h1 className="text-white">Results</h1>
          <Grid container spacing={4} sx={{ paddingBottom: '40px' }}>
            {searchResults.map((data: UserData) => {
              return (
                <Grid item key={data.id} xs={12} sm={6} md={4}>
                  <Card sx={{ boxShadow: 'none', backgroundColor: '#121212' }}>
                    <Stack spacing={1}>
                      {!imageLoaded[data.id] && (
                        <Skeleton
                          variant="rectangular"
                          width={`100%`}
                          sx={{
                            height: '178px',
                            '@media (min-width: 768px)': {
                              height: '173px',
                            },
                            '@media (min-width: 912px)': {
                              height: '147px',
                            },
                          }}
                        />
                      )}
                    </Stack>
                    <CardMedia
                      component="img"
                      sx={{
                        '& img': {
                          height: '146px',
                        },
                      }}
                      image={data.avater}
                      alt="image"
                      onLoad={() => {
                        setImageLoaded((prevImageLoaded) => ({
                          ...prevImageLoaded,
                          [data.id]: true,
                        }));
                      }}
                      onError={(event) => {
                        const imgElement = event.target as HTMLImageElement;
                        imgElement.src = DefaultImage;
                      }}
                    />
                    <div className="bg-dark">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          color: 'white',
                          fontFamily: 'ubuntu',
                          fontSize: '14.9px',
                          lightHeight: '150%',
                          paddingTop: '12px',
                        }}
                      >
                        This is a title
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#B2B2B2"
                        sx={{
                          fontFamily: 'ubuntu',
                          fontSize: '11.175px',
                          lightHeight: '150%',
                        }}
                      >
                        by {data.username}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {hasMore && <Button text={isLoading ? 'Loading...' : 'More'} handleClick={loadMoreItems} />}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
