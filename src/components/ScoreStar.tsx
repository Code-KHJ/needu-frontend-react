import * as React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

interface ScoreStarProps {
  name: string;
  readonly: boolean;
  fontsize: string;
  value: number | any;
  onChange: (newValue: number) => void;
}

const StyledRating = styled(Rating)(({ fontsize }: ScoreStarProps) => ({
  '& .MuiRating-iconFilled': {
    color: '#FFD338',
    fontSize: fontsize,
  },
  '& .MuiRating-iconEmpty': {
    fontSize: fontsize,
  },
}));

const ScoreStar: React.FC<ScoreStarProps> = ({
  name,
  readonly,
  fontsize,
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
      fontsize={fontsize}
      defaultValue={0}
      precision={0.5}
      value={value}
      onChange={!readonly ? handleRating : undefined}
    />
  );
};

export default ScoreStar;
