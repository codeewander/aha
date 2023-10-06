import { ChangeEvent, FC } from 'react';
import SearchInput from '@/components/common/SearchInput';
import Divider from '@mui/material/Divider';
import Slider from '@/components/common/Slider';
import Button from '@/components/common/Button';
import Container from '@mui/material/Container';
import MobileNavbar from '@/components/UI/MobileNav';

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
      <MobileNavbar isHomePage={true} />
      <Container
        maxWidth="md"
        className="pt-[72px] flex-col justify-between xs:py-20"
        sx={{ paddingLeft: '20px', paddingRight: '20px', height: '100%', display: 'flex' }}
      >
        <div>
          <SearchInput value={searchText} onChange={handleSearchInput} />
          <Divider
            color="white"
            sx={{
              marginTop: '30px',
              marginBottom: '30px',
              opacity: 0.1,
            }}
          />
          <p className="text-2xl text-white pb-5"># Of Results Per Page</p>
          <p className="text-white">
            <span className="text-5xl pr-2.5">{scaleValue}</span> result
          </p>
          <Slider setScaleValue={setScaleValue} />
        </div>
        <div className="flex flex-col grow justify-end xs:justify-between mb-6">
          <Divider
            color="white"
            sx={{
              marginTop: '30px',
              marginBottom: '80px',
              opacity: 0.1,
              '@media (min-width: 468px)': {
                marginBottom: '30px',
              },
            }}
          />
          <Button
            handleClick={handleSearch}
            text="Search"
            customStyle={{
              padding: '13px 16px',
              width: '100%',
              '@media (min-width: 468px)': {
                maxWidth: '343px',
              },
            }}
          />
        </div>
      </Container>
    </>
  );
};
export default Search;
