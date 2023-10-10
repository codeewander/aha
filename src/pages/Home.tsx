import { useState, FC, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Results from '@/components/UI/SearchResult';
import Search from '@/components/UI/Search';
import Container from '@mui/material/Container';
import Navbar from '@/components/UI/Navbar';
import useScreenSize from '@/hooks/useScreenSize';

const Home: FC = () => {
  const navigate = useNavigate();
  const { isMobileScreen } = useScreenSize();
  const [searchParams] = useSearchParams();

  const [scaleValue, setScaleValue] = useState(30);
  const [searchText, setSearchText] = useState('');

  const searchQuery = searchParams.get('search');
  const size = searchParams.get('size');
  const isSearchResult = searchQuery && size;

  const setInitialSetting = () => {
    setSearchText('');
    setScaleValue(30);
  };

  const handleSearch = () => {
    navigate(`/?search=${searchText}&size=${scaleValue}`);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  return (
    <>
      {(!isSearchResult || (!isMobileScreen && isSearchResult)) && <Navbar />}
      <Container
        maxWidth="md"
        className={`flex-col pt-[72px] ${
          isSearchResult ? 'justify-start xs:pt-[48px] ' : 'justify-between xs:pb-[87px] xs:pt-[54px]'
        }`}
        sx={{
          height: '100%',
          display: 'flex',
          paddingLeft: '20px',
          paddingRight: '20px',
          '@media (min-width: 900px)': {
            paddingLeft: '0px',
            paddingRight: '0px',
            maxWidth: '725px',
          },
        }}
      >
        {isSearchResult ? (
          <Results setInitial={setInitialSetting} />
        ) : (
          <Search
            handleSearch={handleSearch}
            scaleValue={scaleValue}
            searchText={searchText}
            setScaleValue={setScaleValue}
            handleSearchInput={handleSearchInput}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
