import { ChangeEvent, FC } from 'react';
import SearchInput from '@/components/common/SearchInput';
import Divider from '@mui/material/Divider';
import Slider from '@/components/common/Slider';
import Button from '@/components/common/Button';
// import Container from '@mui/material/Container';
import MobileNavbar from '@/components/UI/MobileNav';
import { MOBILE_SCREEN } from '@/constants/mediaQueries';

type SearchProps = {
  searchText: string;
  scaleValue: number;
  setScaleValue: (_newValue: number) => void;
  handleSearch: () => void;
  handleSearchInput: (_event: ChangeEvent<HTMLInputElement>) => void;
};

const Search: FC<SearchProps> = ({ searchText, scaleValue, setScaleValue, handleSearch, handleSearchInput }) => {
  return (
    <>
      <MobileNavbar page="home" />
      <div>
        <SearchInput value={searchText} onChange={handleSearchInput} />
        <Divider
          color="white"
          sx={{
            marginTop: '30px',
            marginBottom: '2px',
            opacity: 0.1,
            display: 'none',
            '@media (min-width: 900px)': {
              maxWidth: '701px',
            },
            [`@media (min-width: ${MOBILE_SCREEN}px)`]: {
              display: 'block',
            },
          }}
        />
        <p className="text-2xl text-white pb-5 pt-[28px]"># Of Results Per Page</p>
        <p className="text-white mb-[4px]">
          <span className="text-5xl pr-2.5">{scaleValue}</span> results
        </p>
        <Slider setScaleValue={setScaleValue} />
      </div>
      <div className="flex flex-col grow justify-end xs:justify-between">
        <Divider
          color="white"
          sx={{
            marginTop: '30px',
            marginBottom: '80px',
            opacity: 0.1,
            [`@media (min-width: ${MOBILE_SCREEN}px)`]: {
              marginBottom: '26px',
            },
          }}
        />
        <Button
          handleClick={handleSearch}
          text="Search"
          customStyle={{
            padding: '13px 16px',
            width: '100%',
            marginBottom: '24px',
            [`@media (min-width: ${MOBILE_SCREEN}px)`]: {
              maxWidth: '343px',
              marginBottom: '0px',
            },
          }}
        />
      </div>
    </>
  );
};
export default Search;
