import * as React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

interface ScoreStarProps {
  name: string;
  readonly: boolean;
  value: number | any;
  onChange: (newValue: number) => void;
}

const StyledRating = styled(Rating)(() => ({
  '& .MuiRating-iconFilled': {
    color: '#FFD338',
    fontSize: '40px',
    '@media (min-width: 768px)': {
      fontSize: '60px',
    },
  },
  '& .MuiRating-iconEmpty': {
    fontSize: '40px',
    '@media (min-width: 768px)': {
      fontSize: '60px',
    },
  },
}));

const ScoreStar: React.FC<ScoreStarProps> = ({
  name,
  readonly,
  value,
  onChange,
}) => {
  const handleRating = (e: React.ChangeEvent<{}>, newValue: number | null) => {
    if (!readonly && newValue !== null) {
      onChange(newValue);
    }
  };
  return (
    <StyledRating
      name={name}
      readOnly={readonly}
      defaultValue={0}
      precision={0.5}
      value={value}
      onChange={!readonly ? handleRating : undefined}
    />
  );
};

export default ScoreStar;
