import * as React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

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
    "& .MuiRating-iconFilled": {
      color: "#FFD338",
      fontSize: mosize,
      "@media (min-width: 768px)": {
        fontSize: tabsize,
      },
    },
    "& .MuiRating-iconEmpty": {
      fontSize: mosize,
      "@media (min-width: 768px)": {
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
    e.preventDefault();
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
      value={parseFloat(value)}
      onChange={!readonly ? handleRating : undefined}
      emptyIcon={
        <StarIcon style={{ opacity: 1, color: "#d9d9d9" }} fontSize="inherit" />
      }
    />
  );
};

export default ScoreStar;
