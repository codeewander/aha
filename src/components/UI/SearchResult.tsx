import { useState, useEffect, useRef, useMemo, useCallback, FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Grid, CardMedia, Card, Typography, Skeleton } from '@mui/material';
import Button from '@/components/common/Button';
import DefaultImage from '@/assets/resultImage.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import MobileNavbar from '@/components/UI/MobileNav';
import Stack from '@mui/material/Stack';
import { UserData } from '@/constants/userTypes';
import { MEDIUM_SCREEN } from '@/constants/mediaQueries';

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
      <MobileNavbar action={backToHomePage} page="results" />
      <ArrowBackIcon
        sx={{
          color: 'white',
          position: 'relative',
          top: '35px',
          right: '35px',
          cursor: 'pointer',
          display: 'none',
          [`@media (min-width: ${MEDIUM_SCREEN}px)`]: {
            display: 'inline-block',
          },
        }}
        onClick={() => {
          setInitial();
          setSearchResults([]);
          navigate('/');
        }}
      />
      <div className="xs:p-0 w-full flex justify-center">
        <div className="w-full overflow-y-auto py-[20px] xs:py-0" style={{ height: 'calc(100vh - 72px)' }}>
          <h2 className="text-white pb-[24px]">Results</h2>
          {!searchResults.length && initialApiCallMade.current && !isLoading && (
            <div className="text-white pt-5">No results found</div>
          )}
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
                          fontSize: '14.9px',
                          paddingTop: '12px',
                        }}
                      >
                        This is a title
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#B2B2B2"
                        sx={{
                          fontSize: '11.175px',
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
