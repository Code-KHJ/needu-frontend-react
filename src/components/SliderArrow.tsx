import arrow_left from "@/assets/images/btn_slick_arrow_L.png";
import arrow_right from "@/assets/images/btn_slick_arrow_R.png";

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: `url(${arrow_left}) no-repeat
          center/contain`,
      }}
      onClick={onClick}
    ></div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: `url(${arrow_right}) no-repeat
          center/contain`,
      }}
      onClick={onClick}
    />
  );
};

export { NextArrow, PrevArrow };
