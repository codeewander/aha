import { useState, FC, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Results from '@/components/UI/SearchResult';
import Search from '@/components/UI/Search';

const Home: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [scaleValue, setScaleValue] = useState(30);
  const [searchText, setSearchText] = useState('');

  const searchQuery = searchParams.get('search');
  const size = searchParams.get('size');

  const setInitialSetting = () => {
    setSearchText('');
    setScaleValue(30);
  };

  const handleSearch = () => {
    navigate(`/?search=${searchText}&size=${scaleValue}`);
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  if (searchQuery && size) {
    return <Results setInitial={setInitialSetting} />;
  } else {
    return (
      <Search
        handleSearch={handleSearch}
        scaleValue={scaleValue}
        searchText={searchText}
        setScaleValue={setScaleValue}
        handleSearchInput={handleSearchInput}
      />
    );
  }
};

export default Home;
