import * as React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

interface ScoreStarProps {
  name: string;
  readonly: boolean;
  mosize: string;
  tabsize: string;
  value: number | any;
  onChange: (newValue: number) => void;
}

const StyledRating = styled(Rating)<{ tabsize: string; mosize: string }>(
  ({ tabsize, mosize }) => ({
    '& .MuiRating-iconFilled': {
      color: '#FFD338',
      fontSize: mosize,
      '@media (min-width: 768px)': {
        fontSize: tabsize,
      },
    },
    '& .MuiRating-iconEmpty': {
      fontSize: mosize,
      '@media (min-width: 768px)': {
        fontSize: tabsize,
      },
    },
  })
);

const ScoreStar: React.FC<ScoreStarProps> = ({
  name,
  mosize,
  tabsize,
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
      mosize={mosize}
      tabsize={tabsize}
      readOnly={readonly}
      defaultValue={0}
      precision={0.5}
      value={value}
      onChange={!readonly ? handleRating : undefined}
    />
  );
};

export default ScoreStar;
