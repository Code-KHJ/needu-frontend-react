import reviewApi from "@/apis/review";
import { useLoading } from "@/contexts/LoadingContext";
import { ReviewContent, ReviewTrainingDto } from "@/interface/Review";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const reviewType = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<
    ReviewContent[] | ReviewTrainingDto[]
  >([]);

  useEffect(() => {
    showLoading();
    const getReview = async () => {
      let response: any;
      if (reviewType === "working") {
        response = await reviewApi.getWorkingReviewsByUser();
      } else if (reviewType === "training") {
        response = await reviewApi.getTrainingReviewsByUser();
      }
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        window.location.reload();
      }
      const setData = response.data.map((item: any) => ({
        ...item,
        status: false,
      }));
      setReviewList(setData);
    };
    getReview();
    hideLoading();
  }, [reviewType]);
  console.log(reviewList);

  return <div>Review</div>;
};

export default Review;
