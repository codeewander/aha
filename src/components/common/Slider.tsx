import { useState, FC } from 'react';
import Box from '@mui/material/Box';
import MuiSlider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '3',
    scaledValue: 3,
  },
  {
    value: 3,
    label: '6',
    scaledValue: 6,
  },
  {
    value: 6,
    label: '9',
    scaledValue: 9,
  },
  {
    value: 9,
    label: '12',
    scaledValue: 12,
  },
  {
    value: 12,
    label: '15',
    scaledValue: 15,
  },
  {
    value: 15,
    label: '30',
    scaledValue: 30,
  },
];

type SliderProps = {
  setScaleValue: (_value: number) => void;
};

const Slider: FC<SliderProps> = ({ setScaleValue }) => {
  const [value, setValue] = useState<number>(15);

  const handleChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
      if (newValue > 12) {
        const label = (newValue - 12) * 5 + 15;
        setScaleValue(label);
      } else {
        setScaleValue(newValue + 3);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MuiSlider
        value={value}
        getAriaValueText={(value) => `${value}`}
        marks={marks}
        min={0}
        step={1}
        max={15}
        onChange={handleChange}
        sx={{
          cursor: 'pointer',
          color: 'black',
          height: '8px',
          '& .MuiSlider-root': {
            color: '#FFD25F',
          },
          '& .MuiSlider-rail': {
            backgroundColor: 'white',
            opacity: 0.3,
          },
          '& .MuiSlider-mark': {
            backgroundColor: 'transparent',
          },
          '& .MuiSlider-markLabel': {
            color: 'white',
            opacity: 0.5,
          },
          '& .MuiSlider-track': {
            backgroundImage: 'linear-gradient(to right,#FF5C01, #FFD25F)',
          },
          '& .MuiSlider-thumb': {
            '&::before': {
              border: '4px solid #FFD25F',
            },
          },
        }}
      />
    </Box>
  );
};

export default Slider;
