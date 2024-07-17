import React, { useState } from "react";
import ModalComponent from "./Modal";
import styles from "./Modal.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const ReportModal = () => {
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
    targetId: "",
    userId: "",
    reportType: "",
    comment: "",
  });
  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    handleStep(2);
    console.log(values);
  };

  return (
    <>
      {/* 신고종류 선택 */}
      {reportStep === 0 && (
        <ModalComponent title="신고" modalOpen={reportStep === 0}>
          <div>
            <div style={{ padding: "8px" }}>
              <h4 style={{ cursor: "pointer" }} onClick={() => handleStep(1)}>
                일반신고
                <img
                  src="/src/assets/images/arrow_right.png"
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
                  src="/src/assets/images/ico_ext.png"
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
                  심의 절차에 따라 처리됩니다.
                </p>
                <p style={{ color: "#aaa" }}>
                  (구글 폼을 통해 접수, 캡처본 등 상세 서류 제출 필수)
                </p>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
      {/* 일반신고 접수 */}
      {reportStep === 1 && (
        <ModalComponent title="신고" modalOpen={reportStep === 1}>
          <div>
            <div>
              <h4>신고유형</h4>
              <div style={{ marginTop: "20px" }}>
                <RadioGroup
                  name="reportType"
                  value={values.reportType}
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
        <ModalComponent title="신고" modalOpen={reportStep === 2}>
          <div>
            <div style={{ padding: "8px" }}>
              <h4>신고가 접수되었습니다.</h4>
              <div style={{ marginTop: "20px", padding: "0 8px" }}>
                <p>
                  접수된 일자로부터 영업일 기준 3일 이내 확인 후 조치될
                  예정입니다. 어쩌구 저쩌구 문의는 메일로 부탁드립니다.
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
