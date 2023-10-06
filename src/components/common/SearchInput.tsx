import { InputHTMLAttributes, ForwardedRef, forwardRef, ChangeEventHandler, FC } from 'react';
import { Input } from '@mui/base/Input';

const customInputClass = `
  bg-dark
  w-full
  border-[3px]
  border-solid
  border-white
  opacity-50
  rounded-md
  text-white
  text-sm
  p-[18px]
  focus:outline-none
  focus:border-main
  focus:opacity-100
`;

const CustomInput = forwardRef(function CustomInput(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Input
      slotProps={{
        input: {
          className: customInputClass,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <p className="text-2xl text-white	leading-9	pb-5">Search</p>
      <CustomInput aria-label="search keyword" placeholder="Keyword" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchInput;
