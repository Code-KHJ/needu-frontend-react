import corpApi from "@/apis/corp";
import reviewApi from "@/apis/review";
import sharedApi from "@/apis/shared";
import { StarList } from "@/common/StarList";
import Button from "@/components/elements/Button";
import InputDate from "@/components/elements/InputDate";
import ScoreStar from "@/components/ScoreStar";
import { useConfirm } from "@/contexts/ConfirmContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { ReviewWorkingDto } from "@/interface/Review";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Write.module.scss";
import Helmets from "../helmets";

const EditWorking = () => {
  const { customConfirm } = useConfirm();
  const { showLoading, hideLoading } = useLoading();
  const previousPage = useLocation().state?.previous;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const no = queryParams.get("no");
  //@ts-ignore
  const { user } = useUser();

  const [corp, setCorp] = useState({
    id: null,
    corp_name: null,
    city: null,
    gugun: null,
    hashtag: null,
    cnt: null,
    avg: null,
  });
  interface Hashtag {
    id: string;
    content: string;
  }
  interface CareerType {
    id: string;
    type: string;
  }
  interface Shared {
    careerType: CareerType[];
    hashtagList: Hashtag[];
  }
  const [shared, setShared] = useState<Shared>({
    careerType: [],
    hashtagList: [],
  });
  const starList = StarList.working;

  const [values, setValues] = useState<ReviewWorkingDto>({
    corp_name: "",
    user_id: user.user_id,
    start_date: "",
    end_date: "",
    career_type: "",
    hashtag: [],
    total_score: 0,
    growth_score: 0,
    leadership_score: 0,
    reward_score: 0,
    worth_score: 0,
    culture_score: 0,
    worklife_score: 0,
    highlight: "",
    pros: "",
    cons: "",
  });

  useEffect(() => {
    const getShared = async () => {
      const careerType: any = await sharedApi.getCareerType();
      const hashtagList: any = await sharedApi.getHashtagList();

      if (careerType.status === 200 && hashtagList.status === 200) {
        setShared({
          careerType: careerType.data,
          hashtagList: hashtagList.data,
        });
      }
    };
    getShared();
  }, []);

  useEffect(() => {
    if (!no) {
      navigate("/404");
      return;
    }
    showLoading();
    const getCorp = async (corpName: string) => {
      const response: any = await corpApi.getWithWorking(corpName);
      if (response.status !== 200) {
        hideLoading();
        navigate("/error", {
          state: { previous: previousPage },
        });
        return;
      }
      if (!response.data.corp_name) {
        hideLoading();
        navigate("/404", {
          state: { previous: previousPage },
        });
        return;
      }
      setCorp(response.data);
    };
    const getReview = async () => {
      const response: any = await reviewApi.getWorkingReview(no);
      if (response.status === 403) {
        alert("권한이 없습니다.");
        window.history.back();
      }
      if (response.status !== 200) {
        hideLoading();
        navigate("/error", {
          state: { previous: previousPage },
        });
        return;
      }
      getCorp(response.data.corp.corp_name);
      setValues((prevValues) => ({
        ...prevValues,
        corp_name: response.data.corp.corp_name,
        start_date: response.data.userCareer.first_date,
        end_date: response.data.userCareer.last_date,
        career_type: response.data.userCareer.type,
        hashtag: response.data.hashtag,
        total_score: parseFloat(response.data.total_score),
        growth_score: parseFloat(response.data.growth_score),
        leadership_score: parseFloat(response.data.leadership_score),
        reward_score: parseFloat(response.data.reward_score),
        worth_score: parseFloat(response.data.worth_score),
        culture_score: parseFloat(response.data.culture_score),
        worklife_score: parseFloat(response.data.worklife_score),
        highlight: response.data.highlight,
        pros: response.data.pros,
        cons: response.data.cons,
      }));
      if (response.data.userCareer.last_date === "9999-12-31") {
        setWorking(true);
      }
    };
    getReview();
    hideLoading();
  }, [no]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [valid, setValid] = useState({
    corp_name: false,
    user_id: false,
    start_date: false,
    end_date: false,
    career_type: false,
    total_score: false,
    growth_score: false,
    leadership_score: false,
    reward_score: false,
    worth_score: false,
    culture_score: false,
    worklife_score: false,
    highlight: false,
    pros: false,
    cons: false,
  });

  useEffect(() => {
    setValid({
      corp_name: values.corp_name !== "",
      user_id: values.user_id !== "",
      start_date: values.start_date !== "",
      end_date: values.end_date !== "",
      career_type: values.career_type !== "",
      total_score: values.total_score > 0,
      growth_score: values.growth_score > 0,
      leadership_score: values.leadership_score > 0,
      reward_score: values.reward_score > 0,
      worth_score: values.worth_score > 0,
      culture_score: values.culture_score > 0,
      worklife_score: values.worklife_score > 0,
      highlight: values.highlight.length > 2,
      pros: values.pros.length >= 30,
      cons: values.cons.length >= 30,
    });
  }, [values]);

  const [working, setWorking] = useState(false);
  useEffect(() => {
    if (working) {
      setValues({
        ...values,
        end_date: "9999-12-31",
      });
    } else {
      setValues({
        ...values,
        end_date: "",
      });
    }
  }, [working]);

  const selectHashtag = (no: string) => {
    setValues((prevValues) => {
      const newHashtag = prevValues.hashtag.includes(no)
        ? prevValues.hashtag.filter((item) => item !== no)
        : [...prevValues.hashtag, no];

      return {
        ...prevValues,
        hashtag: newHashtag,
      };
    });
  };

  const handleScoreChange = (name: string, newValue: number) => {
    if (newValue !== null) {
      const updatedValues = {
        ...values,
        [name]: parseFloat(newValue.toFixed(1)),
      };

      const totalScore =
        (updatedValues.growth_score +
          updatedValues.leadership_score +
          updatedValues.reward_score +
          updatedValues.worth_score +
          updatedValues.culture_score +
          updatedValues.worklife_score) /
        6;

      setValues((prevValues) => ({
        ...prevValues,
        ...updatedValues,
        total_score: parseFloat(totalScore.toFixed(1)),
      }));
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(valid).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [values, valid]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmed = await customConfirm("리뷰를 수정하시겠습니까?");
    if (confirmed) {
      const response: any = await reviewApi.updateWorkingReview(
        no as string,
        values
      );
      if (response.status !== 200) {
        alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("리뷰가 수정되었습니다.");
        navigate(`/review/detail/working?name=${values.corp_name}`);
      }
    }
  };
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <>
      <Helmets
        title={"전현직 리뷰 수정 I 사회복지 커뮤니티 NEEDU"}
        description=""
      ></Helmets>
      <div className={styles.write_working_wrap}>
        <div className={styles.corp_info}>
          <h1 className={styles.corp_name}>{corp.corp_name}</h1>
          <p className={`body1 ${styles.corp_location}`}>
            {corp.city} {corp.gugun}
          </p>
          <p className={`body1 ${styles.corp_review_cnt}`}>
            이 기관에 <strong className={`banner_title`}>{corp.cnt}</strong> 개
            리뷰가 있어요!
          </p>
        </div>
        <div className={styles.guide}>
          <p>입력하신 모든 정보는 익명으로 처리됩니다.</p>
          <p>
            NEEDU{" "}
            <a
              href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-d7cb722b6a6247d38594aff27c31c036?pvs=4"
              target="_blank"
            >
              운영가이드
            </a>
            에 위배되는 리뷰는 운영자에 의해 조치될 수 있습니다.
          </p>
          <p>
            <strong>(주의)</strong> 특정인을 향한 비방, 욕설은 법적인 문자게
            발생할 수 있습니다.
          </p>
        </div>
        <form className={styles.form_wrap}>
          <div className={styles.multiple_choice}>
            <div className={styles.work_info_wrap}>
              <h4>근무정보</h4>
              <div className={styles.work_info_content}>
                <div className={styles.period}>
                  <div className={styles.label}>
                    <div className="subtitle">근무기간</div>
                    <div>
                      <input
                        type="checkbox"
                        checked={working}
                        onChange={() => setWorking(!working)}
                      />
                      <label>재직중</label>
                    </div>
                  </div>
                  <div className={styles.date_pickr}>
                    <InputDate
                      name="start_date"
                      working={false}
                      value={values.start_date}
                      onChange={handleChange}
                      minDate="1950-01-01"
                    ></InputDate>
                    {working ? (
                      <InputDate
                        key={values.start_date}
                        name="end_date"
                        working={true}
                        value={values.end_date}
                        onChange={handleChange}
                        minDate={values.start_date}
                      ></InputDate>
                    ) : (
                      <InputDate
                        key={values.start_date}
                        name="end_date"
                        working={false}
                        value={values.end_date}
                        onChange={handleChange}
                        minDate={values.start_date}
                      ></InputDate>
                    )}
                  </div>
                </div>
                <div className={styles.work_type}>
                  <div className="subtitle">근무직종</div>
                  <select
                    name="career_type"
                    className={`${
                      valid.career_type
                        ? styles.valid
                        : values.career_type == ""
                        ? ""
                        : styles.invalid
                    }`}
                    value={values.career_type}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      직종 선택
                    </option>
                    {shared.careerType.map((item) => (
                      <option key={item.id} value={item.type}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.keyword}>
                  <div className="subtitle">키워드 선택</div>
                  <div className={styles.keyword_wrap}>
                    {shared.hashtagList.map((item) => (
                      <input
                        key={item.id}
                        className={`${styles.keyword_item} ${
                          values.hashtag.includes(item.id)
                            ? styles.selected
                            : ""
                        }`}
                        type="button"
                        value={item.content}
                        onClick={() => selectHashtag(item.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.score_wrap}>
              <h4>평가하기</h4>
              <div className={styles.score_content}>
                {starList.map((item) => (
                  <div className={styles.score_item} key={item.en}>
                    <div className="subtitle">{item.ko}</div>
                    <div className={styles.score_star}>
                      <ScoreStar
                        name={item.en}
                        mosize="40px"
                        tabsize="60px"
                        readonly={false}
                        value={values[item.en]}
                        onChange={(newValue) =>
                          handleScoreChange(item.en, newValue)
                        }
                      ></ScoreStar>
                      <div className="banner_title">
                        {(values[item.en] as number).toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.total_score}>
            <h4>총점</h4>
            <ScoreStar
              name="total_score"
              mosize="40px"
              tabsize="60px"
              readonly={true}
              value={values.total_score}
              onChange={(newValue) =>
                handleScoreChange("total_score", newValue)
              }
            ></ScoreStar>
            <div className="banner_title">{values.total_score.toFixed(1)}</div>
          </div>
          <div className={styles.subjective}>
            <h4>상세평가</h4>
            <div className={styles.subjective_content}>
              <div className={styles.subjective_item}>
                <h5>한줄평</h5>
                <textarea
                  className={`${
                    valid.highlight
                      ? styles.valid
                      : values.highlight == ""
                      ? ""
                      : styles.invalid
                  }`}
                  name="highlight"
                  minLength={2}
                  maxLength={50}
                  placeholder="한줄평을 2~15자로 작성해주세요"
                  value={values.highlight}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className={styles.subjective_item}>
                <h5>근무기관 장점</h5>
                <textarea
                  name="pros"
                  className={`${styles.long_text} ${
                    valid.pros
                      ? styles.valid
                      : values.pros == ""
                      ? ""
                      : styles.invalid
                  }`}
                  rows={10}
                  minLength={30}
                  maxLength={2000}
                  placeholder="근무했던 기관의 장점을 작성해주세요.(최소 30자)"
                  value={values.pros}
                  onChange={handleChange}
                ></textarea>
                <p
                  style={{
                    color: values.pros !== "" && !valid.pros ? "red" : "",
                  }}
                  className="body2"
                >
                  현재 글자수: {values.pros.length}자
                </p>
              </div>
              <div className={styles.subjective_item}>
                <h5>근무기관 단점</h5>
                <textarea
                  name="cons"
                  className={`${styles.long_text} ${
                    valid.cons
                      ? styles.valid
                      : values.cons == ""
                      ? ""
                      : styles.invalid
                  }`}
                  rows={10}
                  minLength={30}
                  maxLength={2000}
                  placeholder="근무했던 기관의 단점을 작성해주세요.(최소 30자)"
                  value={values.cons}
                  onChange={handleChange}
                ></textarea>
                <p
                  style={{
                    color: values.cons !== "" && !valid.cons ? "red" : "",
                  }}
                  className="body2"
                >
                  현재 글자수: {values.cons.length}자
                </p>
              </div>
            </div>
          </div>
          <div className={styles.submit_btn_edit}>
            <Button
              children="취소"
              className="btn_condition_false"
              style={{ minWidth: "110px" }}
              isDisabled={false}
              onClick={handleCancel}
            ></Button>
            <Button
              children="수정"
              className={`${
                isSubmitDisabled === false
                  ? "btn_condition_true"
                  : "btn_condition_false"
              }`}
              style={{ minWidth: "110px" }}
              isDisabled={isSubmitDisabled}
              onClick={handleSubmit}
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditWorking;
