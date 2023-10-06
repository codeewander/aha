import { MouseEventHandler, FC } from 'react';

import MuiButton from '@mui/material/Button';

type ButtonProps = {
  variant?: 'contained' | 'text' | 'outlined';
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  customStyle?: object;
};

const Button: FC<ButtonProps> = ({ variant = 'contained', handleClick, text = '', customStyle = {}, ...props }) => {
  return (
    <MuiButton
      variant={variant}
      onClick={handleClick}
      sx={{
        color: '#121212',
        background: 'white',
        fontSize: 14,
        fontFamily: 'ubuntu',
        fontWeight: 700,
        lineHeight: '14px',
        '&:hover': {
          backgroundColor: '#121212',
          border: '1px solid white',
          color: 'white',
        },
        ...customStyle,
      }}
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
