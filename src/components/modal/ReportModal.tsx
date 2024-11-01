import sharedApi from "@/apis/shared";
import arrow_right from "@/assets/images/arrow_right.png";
import ico_ext from "@/assets/images/ico_ext.png";
import { useUser } from "@/contexts/UserContext";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalComponent from "./Modal";
import styles from "./Modal.module.scss";

interface ReportModalProps {
  target: string;
  target_id: number;
  modalOpen: boolean;
  closeModal: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  target,
  target_id,
  modalOpen,
  closeModal,
}) => {
  //@ts-ignore
  const { user } = useUser();

  const [reportStep, setReportStep] = useState(0);
  const handleStep = (step: number) => {
    setReportStep(step);
  };

  const reportType = [
    "욕설/모욕적 발언",
    "차별/비하적 발언",
    "광고/불법성 홍보",
    "사생활 침해",
    "사칭",
    "기타",
  ];

  const [values, setValues] = useState({
    target: "",
    target_id: 0,
    user_id: 0,
    report_type: "",
    comment: "",
  });

  useEffect(() => {
    if (user && user.id) {
      setValues((prevValues) => ({
        ...prevValues,
        user_id: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!modalOpen) {
      setValues({
        target: "",
        target_id: 0,
        user_id: 0,
        report_type: "",
        comment: "",
      });
      setReportStep(0);
    } else {
      setValues({
        target: target,
        target_id: target_id,
        user_id: user.id,
        report_type: "",
        comment: "",
      });
    }
  }, [modalOpen]);

  const handleValues = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    const response: any = await sharedApi.createReport(values);
    if (response.status !== 201) {
      if (response.status === 401) {
        alert("신고는 회원만 가능합니다. 로그인 후 다시 시도해주세요.");
        return;
      }
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    handleStep(2);
    setValues({
      target: "",
      target_id: 0,
      user_id: 0,
      report_type: "",
      comment: "",
    });
  };

  return (
    <>
      {/* 신고종류 선택 */}
      {reportStep === 0 && (
        <ModalComponent
          title="신고"
          modalOpen={reportStep === 0 ? modalOpen : false}
          closeModal={closeModal}
        >
          <div>
            <div style={{ padding: "8px" }}>
              <h4 style={{ cursor: "pointer" }} onClick={() => handleStep(1)}>
                일반신고
                <img
                  src={arrow_right}
                  alt="일반신고"
                  style={{ width: "8px", marginLeft: "8px" }}
                />
              </h4>
              <div style={{ marginTop: "20px", padding: "0 8px" }}>
                <p>
                  게시글로 인해 불쾌감을 느껴 적절한 조치를 원하신다면 니쥬
                  운영진에게 알려주세요.
                </p>
                <p style={{ color: "#aaa" }}>
                  아래 사유들이 해당하며, 신고된 게시글은 운영진의 판단에 따라
                  조치가 취해집니다.
                </p>
                <p style={{ color: "#aaa" }}>
                  - 욕설/모욕/차별/비하적 발언, 광고/불법성 홍보, 사생활 침해,
                  사칭 및 기타 부적절한 내용 등
                </p>
              </div>
            </div>
            <div style={{ marginTop: "40px", padding: "8px" }}>
              <h4
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(
                    "https://neighborly-arithmetic-8e6.notion.site/8de419c655474343a2fa96d467b83f0c",
                    "_blank"
                  )
                }
              >
                권리침해 신고
                <img
                  src={ico_ext}
                  alt="권리침해 신고"
                  style={{
                    width: "17px",
                    marginLeft: "8px",
                    verticalAlign: "bottom",
                  }}
                />
              </h4>
              <div style={{ marginTop: "20px", padding: "0 8px" }}>
                <p>
                  게시글로 인해 사생활 침해/명예 훼손 및 저작권 침해를
                  받으셨다면, 권리침해 신고를 해주세요.
                </p>
                <p style={{ color: "#aaa" }}>
                  방송통신위원회에 신고하는 절차를 안내드리며, 방송통신위원회의
                  심의 절차에 따라 처리됩니다. (구글 폼을 통해 접수, 캡처본 등
                  상세 서류 제출 필수)
                </p>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
      {/* 일반신고 접수 */}
      {reportStep === 1 && (
        <ModalComponent
          title="신고"
          modalOpen={reportStep === 1 ? modalOpen : false}
          closeModal={closeModal}
        >
          <div>
            <div>
              <h4>신고유형</h4>
              <div style={{ marginTop: "20px" }}>
                <RadioGroup
                  name="report_type"
                  value={values.report_type}
                  onChange={handleValues}
                >
                  {reportType.map((item) => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 28,
                            },
                          }}
                          color="default"
                        />
                      }
                      label={item}
                      value={item}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "16px",
                          fontFamily: "Pretendard-Regular",
                          "@media (min-width: 768px)": {
                            fontSize: "18px",
                          },
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div style={{ marginTop: "40px" }}>
              <h4>신고사유</h4>
              <textarea
                name="comment"
                value={values.comment}
                onChange={handleValues}
                className={styles.placeholder_gray}
                style={{
                  width: "100%",
                  height: "fit-content",
                  minHeight: "60px",
                  padding: "12px 16px 0 ",
                  marginTop: "8px",
                  border: "1px solid #aaa",
                  borderRadius: "3px",
                }}
                placeholder="신고 사유를 입력해주세요.(부적절한 내용 등)"
              ></textarea>
            </div>
          </div>
          <div className={styles.btn_2}>
            <button
              style={{
                backgroundColor: "#aaa",
              }}
              onClick={() => handleStep(0)}
            >
              이전
            </button>
            <button
              style={{
                backgroundColor: "#6269f5",
              }}
              onClick={handleSubmit}
            >
              제출
            </button>
          </div>
        </ModalComponent>
      )}
      {/* 신고완료 */}
      {reportStep === 2 && (
        <ModalComponent
          title="신고"
          modalOpen={reportStep === 2 ? modalOpen : false}
          closeModal={closeModal}
        >
          <div>
            <div style={{ padding: "8px" }}>
              <h4>신고가 접수되었습니다.</h4>
              <div style={{ marginTop: "20px", padding: "0 8px" }}>
                <p>
                  접수일로부터 영업일 기준 3일 이내 확인 후 조치됩니다. 자세한
                  문의는 needu.sw@gmail.com로 부탁드립니다.
                </p>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default ReportModal;
