import corpApi from "@/apis/corp";
import reviewApi from "@/apis/review";
import { StarList } from "@/common/StarList";
import ScoreStar from "@/components/ScoreStar";
import Button from "@/components/elements/Button";
import { useConfirm } from "@/contexts/ConfirmContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { ReviewTrainingDto } from "@/interface/Review";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Write.module.scss";

const EditTraining = () => {
  const { customConfirm } = useConfirm();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const no = queryParams.get("no");
  //@ts-ignore
  const { user } = useUser();

  const [corp, setCorp] = useState({
    id: null,
    corp_name: null,
    city: null,
    gugun: null,
    cnt: null,
    avg: null,
  });

  const starList = StarList.training;

  useEffect(() => {
    if (!no) {
      navigate("/");
      return;
    }
    showLoading();
    const getCorp = async (corpName: string) => {
      const response: any = await corpApi.getWithTraining(corpName);
      if (response.status !== 200) {
        navigate("/");
      }
      if (!response.data.corp_name) {
        navigate("/");
      }
      setCorp(response.data);
    };
    const getReview = async () => {
      const response: any = await reviewApi.getTrainingReview(no);
      if (response.status === 403) {
        alert("권한이 없습니다.");
        window.history.back();
      }
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        window.history.back();
      }
      getCorp(response.data.corp.corp_name);
      setValues((prevValues) => ({
        ...prevValues,
        corp_name: response.data.corp_name,
        year: response.data.year,
        season: response.data.season,
        cost: response.data.cost,
        number_of_participants: response.data.number_of_participants,
        duration: response.data.duration,
        total_score: parseFloat(response.data.total_score),
        growth_score: parseFloat(response.data.growth_score),
        worth_score: parseFloat(response.data.worth_score),
        recommend_score: parseFloat(response.data.recommend_score),
        supervisor_score: parseFloat(response.data.supervisor_score),
        highlight: response.data.highlight,
        pros: response.data.pros,
        cons: response.data.cons,
      }));
    };
    getReview();
    hideLoading();
  }, [no]);

  const [values, setValues] = useState<ReviewTrainingDto>({
    corp_name: "",
    user_id: user.user_id,
    year: "",
    season: "",
    cost: null,
    number_of_participants: null,
    duration: null,
    total_score: 0,
    growth_score: 0,
    worth_score: 0,
    recommend_score: 0,
    supervisor_score: 0,
    highlight: "",
    pros: "",
    cons: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (
      name == "cost" ||
      name == "number_of_participants" ||
      name == "duration"
    ) {
      setValues({
        ...values,
        [name]: parseFloat(value),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const [valid, setValid] = useState({
    corp_name: false,
    user_id: false,
    year: false,
    season: false,
    cost: false,
    number_of_participants: false,
    duration: false,
    total_score: false,
    growth_score: false,
    worth_score: false,
    recommend_score: false,
    supervisor_score: false,
    highlight: false,
    pros: false,
    cons: false,
  });

  useEffect(() => {
    setValid({
      corp_name: values.corp_name !== "",
      user_id: values.user_id !== "",
      year: values.year !== "",
      season: values.season !== "",
      cost: values.cost != null && values.cost > 0,
      number_of_participants:
        values.number_of_participants != null &&
        values.number_of_participants > 0,
      duration: values.duration != null && values.duration > 0,
      total_score: values.total_score > 0,
      growth_score: values.growth_score > 0,
      worth_score: values.worth_score > 0,
      recommend_score: values.recommend_score > 0,
      supervisor_score: values.supervisor_score > 0,
      highlight: values.highlight.length > 2,
      pros: values.pros.length >= 30,
      cons: values.cons.length >= 30,
    });
  }, [values]);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2000; year--) {
    years.push(`${year}년`);
  }

  const handleScoreChange = (name: string, newValue: number) => {
    if (newValue !== null) {
      const updatedValues = {
        ...values,
        [name]: parseFloat(newValue.toFixed(1)),
      };

      const totalScore =
        (updatedValues.growth_score +
          updatedValues.worth_score +
          updatedValues.recommend_score +
          updatedValues.supervisor_score) /
        4;

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
      const response: any = await reviewApi.updateTrainingReview(
        no as string,
        values
      );
      if (response.status !== 200) {
        alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("리뷰가 수정되었습니다.");
        navigate(`/review/detail/training?name=${values.corp_name}`);
      }
    }
  };
  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className={styles.write_training_wrap}>
      <div className={styles.corp_info}>
        <h1 className={styles.corp_name}>{corp.corp_name}</h1>
        <p className={`body1 ${styles.corp_location}`}>
          {corp.city} {corp.gugun}
        </p>
        <p className={`body1 ${styles.corp_review_cnt}`}>
          이 기관에 <strong className={`banner_title`}>{corp.cnt}</strong>개
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
          <div className={styles.training_info_wrap}>
            <h4>실습정보</h4>
            <div className={styles.training_info_content}>
              <div className={styles.period}>
                <div className={styles.label}>
                  <div className="subtitle">실습기간</div>
                </div>
                <div className={styles.period_content}>
                  <select
                    name="year"
                    className={`${
                      valid.year
                        ? styles.valid
                        : values.year == ""
                        ? ""
                        : styles.invalid
                    }`}
                    value={values.year}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      실습연도
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    name="season"
                    className={`${
                      valid.season
                        ? styles.valid
                        : values.season == ""
                        ? ""
                        : styles.invalid
                    }`}
                    value={values.season}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      실습시기
                    </option>
                    <option key="여름방학" value="여름방학">
                      여름방학
                    </option>
                    <option key="겨울방학" value="겨울방학">
                      겨울방학
                    </option>
                    <option key="1학기중" value="1학기중">
                      1학기중
                    </option>
                    <option key="2학기중" value="2학기중">
                      2학기중
                    </option>
                  </select>
                </div>
              </div>
              <div className={styles.cost}>
                <div className="subtitle">실습비</div>
                <div className={styles.input_with_unit_container}>
                  <input
                    type="number"
                    name="cost"
                    className={`${styles.input_with_unit} ${
                      valid.cost
                        ? styles.valid
                        : values.cost == null
                        ? ""
                        : styles.invalid
                    }`}
                    placeholder="실습비를 적어주세요"
                    value={values.cost === null ? "" : values.cost}
                    onChange={handleChange}
                  ></input>
                  <span className={styles.unit}>원</span>
                </div>
              </div>
              <div className={styles.people}>
                <div className="subtitle">실습인원</div>
                <div className={styles.input_with_unit_container}>
                  <input
                    type="number"
                    name="number_of_participants"
                    className={`${styles.input_with_unit} ${
                      valid.number_of_participants
                        ? styles.valid
                        : values.number_of_participants == null
                        ? ""
                        : styles.invalid
                    }`}
                    placeholder="함께 실습한 인원을 적어주세요"
                    value={
                      values.number_of_participants === null
                        ? ""
                        : values.number_of_participants
                    }
                    onChange={handleChange}
                  ></input>
                  <span className={styles.unit}>명</span>
                </div>
              </div>
              <div className={styles.duration}>
                <div className="subtitle">실습시간</div>
                <div className={styles.input_with_unit_container}>
                  <input
                    type="number"
                    name="duration"
                    className={`${styles.input_with_unit} ${
                      valid.duration
                        ? styles.valid
                        : values.duration == null
                        ? ""
                        : styles.invalid
                    }`}
                    placeholder="진행한 실습 시간을 적어주세요"
                    value={values.duration === null ? "" : values.duration}
                    onChange={handleChange}
                  ></input>
                  <span className={styles.unit}>시간</span>
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
            onChange={(newValue) => handleScoreChange("total_score", newValue)}
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
              <h5>실습기관 강점</h5>
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
                placeholder="실습했던 기관의 강점을 작성해주세요.(최소 30자)"
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
              <h5>실습기관 약점</h5>
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
                placeholder="실습했던 기관의 약점을 작성해주세요.(최소 30자)"
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
  );
};

export default EditTraining;
